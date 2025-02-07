import React from "react";
import Image from "next/image";
import logo from "../../../public/Images/white-logo.png";
import "./header.styles.css";
const Header = () => {
  return (
    <div className="header-container">
      <Image src={logo} alt={"Logo"} />
    </div>
  );
};

export default Header;
