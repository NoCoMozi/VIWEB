import React from "react";
import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app"; 

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
