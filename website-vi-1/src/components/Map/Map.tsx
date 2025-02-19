import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMapEvent } from "react-leaflet/hooks";

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
  pins: { lat: number; lng: number }[];
  onMapClick?: (coords: [number, number]) => void;
}

const MapComponent = ({ center, pins, onMapClick }: MapComponentProps) => {
  // Handle map click events
  const MapClickHandler = () => {
    useMapEvent("click", (e) => {
      const { lat, lng } = e.latlng;
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
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Render all existing pins */}
      {pins.map((pin, index) => (
        <Marker key={index} position={[pin.lat, pin.lng]} icon={defaultIcon}>
          <Popup>Pinned Location</Popup>
        </Marker>
      ))}
      <MapClickHandler /> {/* Add the click handler */}
    </MapContainer>
  );
};

export default MapComponent;
