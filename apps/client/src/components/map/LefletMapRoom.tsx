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

  useEffect(() => {
    if (!onLocationReceived || !mapContainerRef.current) return;

    const { lat, lng } = onLocationReceived;
    setCurrentLocation({ lat, lng });

    const map = L.map(mapContainerRef.current).setView([lat, lng], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 15,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    if (markerstyle === "marker") {
      markerRef.current = L.marker([lat, lng]).addTo(map);
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
        height: "400px",
        width: "100%",
        position: "relative",
        zIndex: 0,
      }}
    />
  );
};

export default LeafletMapRoom;
