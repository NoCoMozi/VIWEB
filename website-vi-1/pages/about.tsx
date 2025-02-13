import React from "react";
import Image from "next/image";
import LogoWhite from "../public/Images/vi_logo_white.jpg";
import UnitedPeople from "../public/Images/united_people.jpg";
import "@/styles/pages/about.styles.scss";

const about = () => {
  return (
    <div className="about_page_container">
      <div className="top_container">
        <h2 className="header"> Reclaiming our Government from Corruption </h2>
        <Image
          className="united_people"
          src={UnitedPeople}
          alt="United People"
        />
      </div>

      <div className="mission_statement_container"></div>
      <Image className="logo-white" src={LogoWhite} alt="Voices Ignited Logo" />

      <p> This will be where the mission is</p>
    </div>
  );
};

export default about;
