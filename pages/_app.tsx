import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { builder } from '@builder.io/react';

//FIXME: init builder client once
if (process.env.BUILDERIO_KEY) {builder.init(process.env.BUILDERIO_KEY);}

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Philipp Parzer</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default App;
