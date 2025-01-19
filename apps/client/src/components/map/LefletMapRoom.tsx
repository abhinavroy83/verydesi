import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapRoomProps {
  onLocationReceived: { lat: number; lng: number };
  markerstyle: string;
}

const LeafletMapRoom: React.FC<LeafletMapRoomProps> = ({
  onLocationReceived,
  markerstyle,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<L.Layer | null>(null);

  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });
  console.log("lcocat", onLocationReceived);
  useEffect(() => {
    if (!onLocationReceived || !mapContainerRef.current) return;

    const { lat, lng } = onLocationReceived;
    setCurrentLocation({ lat, lng });
    console.log(lat, lng);

    const map = L.map(mapContainerRef.current).setView(
      [45.5231012, -122.6813283],
      14
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 15,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    if (markerstyle === "marker") {
      markerRef.current = L.marker([lat, lng], {
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
              <img src="https://res.cloudinary.com/druohnmyv/image/upload/v1733337909/olziueqwtlrnei2lonrn.png" style="width: 25px; height: 25px;" />
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
          tooltipAnchor: [20, -20],
        }),
      }).addTo(map);
    } else if (markerstyle === "circle") {
      markerRef.current = L.circle([lat, lng], {
        color: "#f03",
        fillColor: "#f03",
        fillOpacity: 0.3,
        radius: 1000,
      }).addTo(map);
    }

    // Event handler for updating location

    // Cleanup when the component unmounts
    return () => {
      map.remove();
    };
  }, [onLocationReceived]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        zIndex: 0,
      }}
    />
  );
};

export default LeafletMapRoom;
