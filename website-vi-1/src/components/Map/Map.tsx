import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";
import { useMapEvent } from "react-leaflet/hooks";
import "@/styles/components/map.styles.scss";
import { Pin } from "@/types/Pin";

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
  pins?: Pin[];
  onMapClick?: (coords: [number, number]) => void;
  onDeletePin?: (id: string) => void;
  recentPinId?: string | null; // Add recentPinId to the props
}

const MapComponent = ({
  center,
  pins = [],
  onMapClick,
  onDeletePin,
  recentPinId, // Destructure recentPinId from props
}: MapComponentProps) => {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );

  // Log the markerPosition state for debugging
  useEffect(() => {
    console.log("markerPosition:", markerPosition);
  }, [markerPosition]);

  // Handle map click events
  const MapClickHandler = () => {
    useMapEvent("click", (e) => {
      const { lat, lng } = e.latlng;

      // Log the coordinates for debugging
      console.log("Map click coordinates:", lat, lng);

      // Validate lat and lng
      if (typeof lat !== "number" || typeof lng !== "number") {
        console.error("Invalid coordinates:", e.latlng);
        return;
      }

      setMarkerPosition([lat, lng]);
      console.log("markerPosition set to:", [lat, lng]);

      if (onMapClick) {
        console.log("Calling onMapClick with coordinates:", [lat, lng]);
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
          <Popup>
            {"Lat: " + pin.lat + " / Long: " + pin.lng}
            {pin._id === recentPinId && ( // Show delete button only for the recent pin
              <button
                onClick={() => onDeletePin && onDeletePin(pin._id)}
                className="delete-button"
              >
                Delete Pin
              </button>
            )}
          </Popup>
        </Marker>
      ))}

      {/* Render user-dropped pin only if markerPosition is valid */}
      {markerPosition && (
        <Marker position={markerPosition} icon={defaultIcon}>
          <Popup>
            {"Lat: " + markerPosition[0] + " / Long: " + markerPosition[1]}
          </Popup>
        </Marker>
      )}

      <MapClickHandler />
    </MapContainer>
  );
};

export default MapComponent;