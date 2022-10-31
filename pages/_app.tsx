import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import {
  BuilderComponent,
  builder,
  Builder,
  useIsPreviewing,
} from "@builder.io/react";
import dynamic from "next/dynamic";

//FIXME: init builder client once
if (process.env.NEXT_PUBLIC_BUILDERIO_KEY) {builder.init(process.env.NEXT_PUBLIC_BUILDERIO_KEY);}

Builder.registerComponent(dynamic(():any => import('../components/builder/BodyCard')), {
  name: 'Card',
  inputs: [
    { name: 'title', type: 'string', defaultValue: 'Builder Component' },
    {
      name: 'description',
      type: 'string',
      defaultValue: 'Builder Text 2',
    },
  ],
});

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
