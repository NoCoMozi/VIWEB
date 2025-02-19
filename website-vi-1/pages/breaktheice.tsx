import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../src/components/Map/Map"), {
  ssr: false,
});

export default function Home() {
  const [zipCode, setZipCode] = useState("");
  const [center, setCenter] = useState<[number, number]>([51.505, -0.09]); // Default center
  const [error, setError] = useState<string | null>(null);
  const [pins, setPins] = useState<{ lat: number; lng: number }[]>([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await axios.get("/api/pins"); // Fetch existing pins from API
        setPins(response.data); // Set pins state
      } catch (error) {
        console.error("Error fetching pins:", error);
      }
    };

    fetchPins(); // Load pins when the component mounts
  }, []);

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
    setError(null); // Clear error when user types
  };

  const handleSearch = async () => {
    if (!zipCode) {
      setError("Please enter a zip code.");
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&postalcode=${zipCode}&country=US&limit=1`
      );

      if (response.data.length === 0) {
        setError("Zip code not found.");
        return;
      }

      const { lat, lon } = response.data[0];
      setCenter([parseFloat(lat), parseFloat(lon)]);
      setError(null);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setError("Failed to fetch coordinates. Please try again.");
    }
  };

  const handleMapClick = async (coords: [number, number]) => {
    try {
      console.log("Dropped pin at:", coords);
      const response = await axios.post("/api/pins", {
        lat: coords[0],
        lng: coords[1],
      });
      console.log("API response:", response.data);
      setPins((prevPins) => [...prevPins, { lat: coords[0], lng: coords[1] }]);
    } catch (error) {
      console.error("Error saving pin:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter zip code"
          value={zipCode}
          onChange={handleZipCodeChange}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
          Search
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MapComponent center={center} onMapClick={handleMapClick} pins={pins} />
    </div>
  );
}
