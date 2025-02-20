import React from "react";
import "@/styles/components/topSection.styles.scss";
import Button from "../Button/Button";
import { useRouter } from "next/router";

interface Mission {
  _id: string;
  heading: string;
  content: string[];
}

interface TopSectionProps {
  missionData: Mission[];
}

const TopSection = ({ missionData }: TopSectionProps) => {
  const router = useRouter();

  return (
    <div className="top-section-container">
      <div className="title-container">
        <h1>We are Voices Ignited</h1>
      </div>

      <div className="description-container">
        {missionData.length > 0 && missionData[0].content.length > 0 ? (
          <h3>{missionData[0].content[0]}</h3>
        ) : (
          <h3>No mission data available.</h3>
        )}

        <div className="buttons-container">
          <Button
            onClick={() => router.push("/join")}
            text="Join The Movement"
            aria-label="Join the movement"
          />
          <Button
            text="Support the Movement"
            onClick={() => router.push("/support")}
            aria-label="Support the movement"
          />
        </div>
      </div>
    </div>
  );
};

export default TopSection;
