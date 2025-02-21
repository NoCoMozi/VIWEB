import ContactForm from "@/components/ContactForm/ContactForm";
import Link from "next/link";
import React from "react";
import "@/styles/pages/join.styles.scss";
import Image from "next/image";
import Protestors from "../public/Images/protestors.jpg";

const join = () => {
  return (
    <div className="join_page">
      <div className="header-container">
        <Image className="join_image" src={Protestors} alt="Protestors" />
        <h1 className="join_header">Interested in Joining Voices Ignited? </h1>
      </div>
      <div className="join_page_information_container">
        <div className="join_telegram_container">
          <h2>Join the Telegram</h2>
          <h3>
            Click the button to be redirected to the Linktree in order to join
            the telegram or reddit chat. This is where we get to know each
            other, organize, plan, share resources, and more.
          </h3>
          <h3>
            There is a holding room process for vetting for the telegram chat so
            please be patient if you are not let in right away. We do this for
            your safety and to ensure anyone who joins does so with positive
            intentions
          </h3>
          <Link className="join_link" href={"https://tr.ee/PR3W8XdqH0"}>
            Linktree Telegram
          </Link>
          <Link className="join_link" href={"https://tr.ee/01X6whegb7"}>
            Linktree Reddit
          </Link>
        </div>
        <div className="join_contact_form">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default join;
