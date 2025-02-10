import React from "react";
import "@/styles/components/topSection.styles.scss";
import Button from "../Button/Button";
import { useRouter } from "next/router";

const TopSection = () => {
  const router = useRouter();

  return (
    <div className="top-section-container">
      <div className="title-container">
        <h1> We are Voices Ignited </h1>
      </div>

      <div className="description-container">
        <h3>
          Voices Ignited is bipartisian organization dedicated to eliminating
          corruption and greed that currently plagues our government. We are not
          about left vs right. We are <span>TOP VS DOWN</span>.
        </h3>
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
