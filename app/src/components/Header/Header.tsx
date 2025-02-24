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
        <Link className="link" href={"/"}>
          Home
        </Link>
        <Link className="link" href={"/about"}>
          About
        </Link>
        <Link className="link" href={"/join"}>
          Join
        </Link>
        {/* <Link className="link" href={"/events"}>
          Events
        </Link> */}
        <Link className="link" href={"/breaktheice"}>
          Break The Ice
        </Link>
        {/* <Link className="link" href={"/news&eduation"}>
          News & Education
        </Link>
        <Link className="link" href={"/resources"}>
          Resources
        </Link> */}
        <Link className="link" href={"/support"}>
          Support
        </Link>
        <Link className="link" href={"/shop"}>
          Shop
        </Link>
      </div>
    </div>
  );
};

export default Header;
