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
import { 
  QueryClient,
  QueryClientProvider
} from "react-query";

//FIXME: init builder client once
if (process.env.NEXT_PUBLIC_BUILDERIO_KEY) {builder.init(process.env.NEXT_PUBLIC_BUILDERIO_KEY);}

const queryClient = new QueryClient()

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
      <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
export default App;
