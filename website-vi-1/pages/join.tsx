import ContactForm from "@/components/ContactForm/ContactForm";
import Link from "next/link";
import React from "react";

const join = () => {
  return (
    <div>
      <h1>Interested in Joining Voices Ignited? </h1>
      <div>
        <ContactForm />
      </div>
      <div>
        <h2>
          {" "}
          Please Click the Link to the Linktree to join the Telegram Chat{" "}
        </h2>
        <Link href={"https://tr.ee/PR3W8XdqH0"}> LinkTree Telegram </Link>
      </div>
    </div>
  );
};

export default join;
