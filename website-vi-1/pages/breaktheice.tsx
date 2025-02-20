import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import "@/styles/pages/breaktheice.styles.scss";
import { Pin } from "@/types/Pin";
import { ObjectId } from "mongodb";

const MapComponent = dynamic(() => import("../src/components/Map/Map"), {
  ssr: false,
});

export default function BreakTheIce() {
  const [zipCode, setZipCode] = useState("");
  const [center, setCenter] = useState<[number, number]>([38.9072, -77.0369]); // Washington, D.C.
  const [error, setError] = useState<string | null>(null);
  const [pins, setPins] = useState<Pin[]>([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await axios.get("/api/pins");

        // If the response contains a `pins` array, use it directly
        // Otherwise, assume the response is an array of pin objects
        const pins = Array.isArray(response.data)
          ? response.data
          : response.data.pins;

        setPins(pins);
      } catch (error) {
        console.error("Error fetching pins:", error);
      }
    };

    fetchPins();
  }, []);

  const handleDeletePin = async (_id: string) => {
    try {
      console.log("Deleting pin with ID:", _id); // Log the _id

      const response = await axios.delete("/api/pins", {
        data: { _id },
      });


      setPins((prevPins) => prevPins.filter((pin) => pin._id !== _id));
    } catch (error) {
      console.error("Error deleting pin:", error);
    }
  };

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
      const response = await axios.post("/api/pins", {
        lat: coords[0],
        lng: coords[1],
      });

      // Extract the `pin` object from the response
      const newPin = response.data.pin;

      // Update the pins state with the new pin
      setPins((prevPins) => [...prevPins, newPin]);
    } catch (error) {
      console.error("Error saving pin:", error);
    }
  };
  return (
    <div className="home-container">
      <div className="BTI_info_container">
        <h1>Welcome to Break the Ice</h1>
        <p>
          This page is for informing people of where I.C.E has been spotted. It
          allows for you to come in and drop a pin in the location you saw I.C.E
        </p>
        <h2> How it Works:</h2>
        <p>
          1. Type in the Zip Code of the location you spotted I.C.E in and click
          Search{" "}
        </p>
        <p>
          2. Zoom into around the location you saw I.C.E with the arrows at the
          top left of the map{" "}
        </p>
        <p>3. Drop a pin by clicking the location on the map </p>
      </div>
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
      <MapComponent
        center={center}
        pins={pins}
        onMapClick={handleMapClick}
        onDeletePin={handleDeletePin}
      />
    </div>
  );
}
