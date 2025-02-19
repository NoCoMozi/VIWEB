import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import "@/styles/pages/breaktheice.styles.scss";

const MapComponent = dynamic(() => import("../src/components/Map/Map"), {
  ssr: false,
});

export default function Home() {
  const [zipCode, setZipCode] = useState("");
  const [center, setCenter] = useState<[number, number]>([38.9072, -77.0369]); // Washington, D.C.
  const [error, setError] = useState<string | null>(null);
  const [pins, setPins] = useState<{ lat: number; lng: number }[]>([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await axios.get("/api/pins");
        setPins(response.data);
      } catch (error) {
        console.error("Error fetching pins:", error);
      }
    };

    fetchPins();
  }, []);

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
    setError(null);
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
      setPins((prevPins) => [...prevPins, { lat: coords[0], lng: coords[1] }]);
    } catch (error) {
      console.error("Error saving pin:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter zip code"
          value={zipCode}
          onChange={handleZipCodeChange}
          className="input-field"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <MapComponent center={center} pins={pins} onMapClick={handleMapClick} />
    </div>
  );
}
