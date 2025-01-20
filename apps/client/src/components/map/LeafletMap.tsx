import React, { useState, useRef, useEffect, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import axios from "axios";
import MapPopup from "./Mappopup";
import { renderToString } from 'react-dom/server';

// Types
interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationData {
  _id: string;
  location: {
    coordinates: [number, number];
  };
  type: "room" | "event";
  title?: string;
  description?: string;
  price?: number;
  startDate?: string;
  endDate?: string;
}

interface MarkerConfig {
  iconUrl: string;
  popupComponent: (data: any) => string;
  detailsEndpoint: string;
}

interface LeafletMapProps {
  style?: React.CSSProperties;
  data?: LocationData[];
  defaultCity?: string;
  markerType?:string;
  onMarkerClick?: (item: LocationData) => void;
  customMarkerConfig?: MarkerConfig;
}

// Constants
const DEFAULT_ZOOM = 10;
const GEOCODING_API_KEY = "2c4e1822d22e4f4ca5f6ca577b523dfe";
const TILE_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const MARKER_CONFIGS: Record<string, MarkerConfig> = {
  room: {
    iconUrl:
      "https://res.cloudinary.com/druohnmyv/image/upload/v1731074132/t9bwal2ivbhxijoafnsb.png",
    popupComponent: (roomDetails: any) =>
      renderToString(<MapPopup roomDetails={roomDetails} />),
    detailsEndpoint: "https://apiv2.verydesi.com/room/findsingleRoom",
  },
  event: {
    iconUrl:
      "https://res.cloudinary.com/druohnmyv/image/upload/v1731074132/t9bwal2ivbhxijoafnsb.png", // Replace with your event marker icon
    popupComponent: (eventDetails: any) => `
      <div class="map-popup">
        <h3>${eventDetails.title || "Event Details"}</h3>
        <p>${eventDetails.description || ""}</p>
        ${
          eventDetails.startDate
            ? `
          <p class="date">
            ${new Date(eventDetails.startDate).toLocaleDateString()} 
            ${eventDetails.endDate ? `- ${new Date(eventDetails.endDate).toLocaleDateString()}` : ""}
          </p>
        `
            : ""
        }
        ${eventDetails.price ? `<p class="price">$${eventDetails.price}</p>` : ""}
      </div>
    `,
    detailsEndpoint: "https://apiv2.verydesi.com/event/findsingleEvent", // Replace with your event endpoint
  },
};

const useMapInitialization = (
  mapContainer: React.RefObject<HTMLDivElement>,
  defaultCity: string
) => {
  const [currentLocation, setCurrentLocation] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });
  const mapInstance = useRef<L.Map | null>(null);
  const markerCluster = useRef<L.MarkerClusterGroup | null>(null);
  const isInitialized = useRef(false);

  const fetchCityCoordinates = async (
    cityName: string
  ): Promise<Coordinates | null> => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${GEOCODING_API_KEY}`
      );
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
      return null;
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      if (isInitialized.current || !mapContainer.current) return;

      const cityCoords = await fetchCityCoordinates(defaultCity);
      if (!cityCoords) return;

      const map = L.map(mapContainer.current).setView(
        [cityCoords.lat, cityCoords.lng],
        DEFAULT_ZOOM
      );

      L.tileLayer(TILE_LAYER_URL, {
        maxZoom: 18,
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const cluster = L.markerClusterGroup({
        iconCreateFunction: (cluster) => {
          return L.divIcon({
            html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
            className: "custom-cluster-icon",
            iconSize: L.point(30, 30),
          });
        },
      });

      map.addLayer(cluster);
      mapInstance.current = map;
      markerCluster.current = cluster;
      setCurrentLocation(cityCoords);
      isInitialized.current = true;
    };

    initializeMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        isInitialized.current = false;
      }
    };
  }, [defaultCity]);

  return { mapInstance, markerCluster, currentLocation };
};

const LeafletMap: React.FC<LeafletMapProps> = ({
  style,
  data = [],
  defaultCity = "Portland",
  markerType = "room",
  onMarkerClick,
  customMarkerConfig,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { mapInstance, markerCluster } = useMapInitialization(
    mapContainer,
    defaultCity
  );

  const markerConfig = customMarkerConfig || MARKER_CONFIGS[markerType];

  const createMarkerIcon = (config: MarkerConfig) => {
    return L.divIcon({
      className: "custom-div-icon",
      html: `
        <div class="marker-container ${markerType}-marker">
          <img src="${config.iconUrl}" class="marker-icon" alt="marker" />
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  };

  useEffect(() => {
    if (!mapInstance.current || !markerCluster.current || !data.length) return;

    markerCluster.current.clearLayers();

    const markers = data.map((item) => {
      const [lng, lat] = item.location.coordinates;

      const marker = L.marker([lat, lng], {
        icon: createMarkerIcon(markerConfig),
      });

      marker.on("click", async () => {
        try {
          if (onMarkerClick) {
            onMarkerClick(item);
          } else {
            const response = await axios.get(
              `${markerConfig.detailsEndpoint}/${item._id}`
            );

            L.popup({
              maxWidth: 150,
              className: `custom-popup ${markerType}-popup`,
            })
              .setLatLng([lat, lng])
              .setContent(markerConfig.popupComponent(response.data))
              .openOn(mapInstance.current!);
          }
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      });

      return marker;
    });

    markerCluster.current.addLayers(markers);
  }, [data, markerType, markerConfig, onMarkerClick]);

  return (
    <div
      ref={mapContainer}
      style={{
        height: "400px",
        borderRadius: "8px",
        position: "relative",
        zIndex: 0,
        ...style,
      }}
    />
  );
};

export default LeafletMap;
