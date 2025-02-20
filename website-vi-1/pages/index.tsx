import TopSection from "@/components/TopSection/TopSection";
import "@/styles/index.styles.scss";
import "@/styles/variables.scss";
import { useEffect, useState } from "react";

interface Mission {
  _id: string;
  heading: string;
  content: string[];
}

export default function Home() {
  const [missionData, setMissionData] = useState<Mission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const res = await fetch("/api/mission");
        const data = await res.json();
        setMissionData(data);
      } catch (error) {
        console.error("Error fetching mission data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMissionData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading spinner or skeleton
  }
  return (
    <div className="page">
      <div className="body-home">
        <TopSection missionData={missionData} />
      </div>
    </div>
  );
}
