import React from "react";
import Image from "next/image";
import logo from "../../../public/Images/white-logo.png";
import "@/styles/components/header.styles.scss";
import Link from "next/link";

const Header = () => {
  return (
    <div className="header-container">
      <Image className="logo" src={logo} alt={"Logo"} />
      <div className="links-container">
        <Link className="link" href={"/home"}>
          Home
        </Link>
        <Link className="link" href={"/about"}>
          About
        </Link>
        <Link className="link" href={"/about"}>
          Events
        </Link>
        <Link className="link" href={"/about"}>
          Break The Ice
        </Link>
        <Link className="link" href={"/about"}>
          News & Education
        </Link>
        <Link className="link" href={"/about"}>
          Resources
        </Link>
        <Link className="link" href={"/about"}>
          Support
        </Link>
      </div>
    </div>
  );
};

export default Header;
