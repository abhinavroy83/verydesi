import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import axios from "axios";
import markerIcon from "@/assests/map-marker2.png";
import { renderToString } from "react-dom/server";
import MapPopup from "./Mappopup";

// Define types for locdata
interface RoomData {
  id: string;
  coordinates: [number, number];
}

interface LocationMap {
  coordinates: [number, number];
  count: number;
  roomIds: string[];
}

// Define props for the component
interface LeafletMapProps {
  style?: React.CSSProperties;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ style }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerClusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const usercity = "Portland";
  const [locdata, setLocData] = useState<RoomData[]>([]);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  // Function to fetch coordinates based on the city name
  const fetchCoordinatesByCity = async (city: string) => {
    try {
      const res = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=2c4e1822d22e4f4ca5f6ca577b523dfe`
      );
      const { lat, lng } = res.data.results[0].geometry;
      return { lat, lng };
    } catch (error) {
      console.log("Error fetching city coordinates:", error);
      return null;
    }
  };

  const getRooms = async (lat: number, lng: number) => {
    try {
      const res = await axios.get(
        usercity
          ? `https://api.verydesi.com/api/getallrooms?city=${usercity}`
          : `https://api.verydesi.com/api/getallrooms?lat=${lat}&lng=${lng}`
      );
      setLocData(
        res.data.Allrooms.map((room: any) => ({
          id: room._id,
          coordinates: room.location.coordinates,
        }))
      );
    } catch (error) {
      console.log("Error fetching API:", error);
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      if (mapRef.current) return;

      let lat: number = 0,
        lng: number = 0;

      if (usercity) {
        const cityCoords = await fetchCoordinatesByCity(usercity);
        if (cityCoords) {
          lat = cityCoords.lat;
          lng = cityCoords.lng;
        }
      } else {
        console.error("City not found");
        return;
      }

      if (mapContainerRef.current) {
        const map = L.map(mapContainerRef.current).setView([lat, lng], 10);
        mapRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        const markerClusterGroup = L.markerClusterGroup({
          iconCreateFunction: (cluster) => {
            const count = cluster.getChildCount();
            return L.divIcon({
              html: `<div style="
                background-color: blue;
                color: white;
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">${count}</div>`,
              className: "custom-cluster-icon",
              iconSize: [30, 30],
            });
          },
        });
        markerClusterRef.current = markerClusterGroup;
        map.addLayer(markerClusterGroup);
        setCurrentLocation({ lat, lng });

        getRooms(lat, lng);
      }
    };

    initializeMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [usercity]);

  useEffect(() => {
    if (mapRef.current && locdata.length > 0) {
      markerClusterRef.current?.clearLayers();

      const locationMap = locdata.reduce<Record<string, LocationMap>>(
        (acc, room) => {
          const { coordinates, id } = room;

          if (
            coordinates.length < 2 ||
            typeof coordinates[0] !== "number" ||
            typeof coordinates[1] !== "number"
          ) {
            console.error("Invalid coordinates:", coordinates);
            return acc;
          }

          const key = `${coordinates[1]},${coordinates[0]}`;
          if (!acc[key]) {
            acc[key] = { coordinates, count: 0, roomIds: [] };
          }
          acc[key].count += 1;
          acc[key].roomIds.push(id);
          return acc;
        },
        {}
      );

      Object.values(locationMap).forEach((location) => {
        const { coordinates, count, roomIds } = location;
        const [lng, lat] = coordinates;

        if (typeof lat !== "number" || typeof lng !== "number") {
          console.error("Invalid latitude or longitude:", lat, lng);
          return;
        }

        const marker = L.marker([lat, lng], {
          icon: L.divIcon({
            className: "custom-div-icon",
            html: `
              <div style="
                background-color: white; 
                border-radius: 50%; 
                width: 40px; 
                height: 40px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);">
                <img src="${markerIcon}" style="width: 25px; height: 25px;" />
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
            tooltipAnchor: [20, -20],
          }),
        });

        marker.on("click", async () => {
          try {
            const _id = roomIds[0];
            const roomDetailResponse = await axios.get(
              `https://api.verydesi.com/api/getspecificroom/${_id}`
            );

            const roomDetails = roomDetailResponse.data.rooms;

            L.popup({
              maxWidth: 150,
              className: "custom-popup",
            })
              .setLatLng([lat, lng])
              .setContent(
                renderToString(<MapPopup roomDetails={roomDetails} />)
              )
              .openOn(mapRef.current!);
          } catch (error) {
            console.log("Error fetching room details:", error);
          }
        });

        markerClusterRef.current?.addLayer(marker);
      });
    }
  }, [locdata]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        ...style,
        height: "550px",
        width: "290px",
        borderRadius: "8px",
        position: "relative",
        zIndex: 0,
      }}
    />
  );
};

export default LeafletMap;
