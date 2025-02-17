import ContactForm from "@/components/ContactForm/ContactForm";
import Link from "next/link";
import React from "react";
import "@/styles/pages/join.styles.scss";

const join = () => {
  return (
    <div className="join_page">
      <h1 className="join_header">Interested in Joining Voices Ignited? </h1>
      <div className="join_page_information_container">
        <div className="join_telegram_container">
          <h2>Join the Telegram</h2>
          <h3>
            Click the button to be redirected to the LinkTree in order to join
            the telegram chat. This is where we get to know each other,
            organize, plan, share resources, and more
          </h3>
          <h3>
            There is a holding room process for vetting so please be patient if
            you aren't let in right away. We do this for your safety and to
            ensure anyone who joins does so with positive intentions
          </h3>
          <Link className="join_link" href={"https://tr.ee/PR3W8XdqH0"}>
            LinkTree Telegram
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
