import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import { useMapEvent } from "react-leaflet/hooks";
import "@/styles/components/map.styles.scss";

// Fix for default marker icons in Leaflet
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapComponentProps {
  center: [number, number];
  pins?: { lat: number; lng: number }[];
  onMapClick?: (coords: [number, number]) => void;
}

const MapComponent = ({ center, pins = [], onMapClick }: MapComponentProps) => {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );

  // Handle map click events
  const MapClickHandler = () => {
    useMapEvent("click", (e) => {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      if (onMapClick) {
        onMapClick([lat, lng]);
      }
    });
    return null;
  };

  return (
    <MapContainer
      key={`${center[0]}-${center[1]}`} // Force re-render when center changes
      center={center}
      zoom={13}
      className="map-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Render stored pins */}
      {pins.map((pin, index) => (
        <Marker key={index} position={[pin.lat, pin.lng]} icon={defaultIcon}>
          <Popup>Pinned Location</Popup>
        </Marker>
      ))}

      {/* Render user-dropped pin */}
      {markerPosition && (
        <Marker position={markerPosition} icon={defaultIcon}>
          <Popup>Your pinned location</Popup>
        </Marker>
      )}

      <MapClickHandler />
    </MapContainer>
  );
};

export default MapComponent;
