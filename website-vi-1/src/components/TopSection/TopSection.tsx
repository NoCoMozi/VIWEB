import React, { useEffect, useState } from "react";
import "@/styles/components/topSection.styles.scss";
import Button from "../Button/Button";
import { useRouter } from "next/router";

// Define a TypeScript interface for the mission data structure
interface Mission {
  _id: string;
  heading: string; // The 'heading' property you're using
  content: string;
}

const TopSection = () => {
  const router = useRouter();

  const [missionData, setMissionData] = useState<Mission[]>([]);

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const res = await fetch("/api/mission");
        const data = await res.json();
        setMissionData(data);
      } catch (error) {
        console.error("Error fetching mission data:", error);
      }
    };

    fetchMissionData();
  }, []);

  return (
    <div className="top-section-container">
      <div className="title-container">
        <h1> We are Voices Ignited </h1>
      </div>

      <div className="description-container">
        {missionData.length > 0 ? (
          <h3>{missionData[0].content}</h3>
        ) : (
          <h3>Loading...</h3> // Show loading state if no mission data is fetched
        )}

        {/* <p>
          We the people recognize our current government no longer serves the
          best interests of its people. Every day millions are deprived of basic
          humans rights and baisc needs to further the interests of the elite.
          In an age of prosperity and technology there is no reason for this
          besides greed and corruption.
        </p>
        <p>
          We the people have the right to use our voices, granted to us under
          the U.S. Consititution, to eliminate this corruption and greed. Voices
          Ignited is an organization By the People and For the People .
        </p>
        <p>
          While we are we are a <span>TOP VS DOWN</span> organization, we stand
          for intersecutionality and equality for ALL people, no exceptions. We
          are not free until we are all free.
        </p> */}
        <div className="buttons-container">
          <Button
            onClick={() => router.push("/join")}
            text="Join The Movement"
          />
          <Button
            text="Support the Movement"
            onClick={() => router.push("/support")}
          />
        </div>
      </div>
    </div>
  );
};

export default TopSection;
