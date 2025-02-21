import React from "react";
import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" /> {/* Add this line */}
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
