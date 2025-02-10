import React from "react";
import Header from "@/components/Header/Header"; // Import the Header component
import "@/styles/globals.css"; // Your global styles

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <>
      {/* Header will be shown on every page */}
      <Header />
      <main>
        {/* The specific page content will be rendered here */}
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
