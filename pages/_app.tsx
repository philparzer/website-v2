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
import { QueryClient, QueryClientProvider } from "react-query";

//FIXME: init builder client once
if (process.env.NEXT_PUBLIC_BUILDERIO_KEY) {
  builder.init(process.env.NEXT_PUBLIC_BUILDERIO_KEY);
}

const queryClient = new QueryClient();

Builder.registerComponent(
  dynamic((): any => import("../components/builder/HeroSection")),
  {
    name: "Hero",
    inputs: [
      { name: "title", type: "string", defaultValue: "Heading" },
      {
        name: "body",
        type: "richText",
        defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        name: "bulletpointTitle",
        type: "string",
        defaultValue: "Technologies",
      },
      {
        name: "bulletpointCategories",
        type: "list",
        defaultValue: [
          { categoryTitle: "website", bulletpoints: [{ text: "Typescript" }] },
        ],
        subFields: [
          {
            name: "categoryTitle",
            type: "string",
          },
          {
            name: "bulletpoints",
            type: "list",
            defaultValue: [{ text: "Typescript" }],
            subFields: [
              {
                name: "text",
                type: "string",
              },
            ],
          },
        ],
      },
    ],
  }
);

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
