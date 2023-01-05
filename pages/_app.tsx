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
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
} from "kbar";
import Favicon from "../components/static/Favicon";

import { contactActions, legalActions, redirect } from "../components/kbar/kbarActions"
import { searchStyle, animatorStyle } from "../components/kbar/kbarStyles";
import RenderResults from "../components/kbar/RenderResults";
import { useEffect, useState } from 'react'
import { linkSync } from "fs";

import { useRouter } from "next/router";
import { Analytics } from '@vercel/analytics/react';
import { localizedKBar, localizedStaticContent } from "../localization/dict";

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

Builder.registerComponent(
  dynamic((): any => import("../components/builder/SideBySide")),
  {
    name: "Text Image",
    inputs: [
      { name: "title", type: "string", defaultValue: "Heading" },
      {
        name: "body",
        type: "richText",
        defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        name: "image",
        type: "file"
      },
      {
        name: "alt text",
        type: "string"
      },
      {
        name: "isRight",
        type: "boolean",
        defaultValue: true
      },
      {
        name: "isVideo",
        type: "boolean"
      },
      {
        name: "format",
        type: "string",
        enum: ['rect', 'square'],
        defaultValue: "rect"
      }
    ],
  }
);

Builder.registerComponent(
  dynamic((): any => import("../components/builder/DreiCard")),
  {
    name: "Card and 3d model",
    inputs: [
      { name: "title", type: "string", defaultValue: "Heading" },
      {
        name: "body",
        type: "richText",
        defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        name: "fbx",
        type: "file",
        allowedFileTypes: ["fbx"]
      },
      {
        name: "scale",
        type: "number"
      },
      {
        name: "isRight",
        type: "boolean",
        defaultValue: true
      },
    ],
  }
);

Builder.registerComponent(
  dynamic((): any => import("../components/builder/InfoSection")),
  {
    name: "Info Content Box",
    inputs: [
      { name: "title", type: "string", defaultValue: "Heading" },
      {
        name: "body",
        type: "richText",
        defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    ],
  }
);

Builder.registerComponent(
  dynamic((): any => import("../components/builder/TextBlock")),
  {
    name: "Text Block",
    inputs: [
      {
        name: "body",
        type: "richText",
        defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
    ],
  }
);

Builder.registerComponent(
  dynamic((): any => import("../components/builder/InlineImage")),
  {
    name: "Inline Image",
    inputs: [
      {
        name: "path",
        type: "file",
      },
      {
        name: "alt",
        type: "string",
      },
      {
        name: "width",
        type: "number",
        defaultValue: 200
      },
      {
        name: "height",
        type: "number",
        defaultValue: 200
      },
    ],
  }
);

function App(props: any) {

  const router = useRouter()
  const locale:any = router.locale;

  return (
    <>
    <KBarProvider>
      <KBarPortal> 
        <KBarPositioner style={{zIndex: 100, overflow:"hidden", backdropFilter: "blur(4px)"}}>
        <KBarAnimator style={animatorStyle}>
            <KBarSearch style={searchStyle} defaultPlaceholder={localizedKBar.kbarSearch[locale]}/>
            <RenderResults locale={locale}/>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      <QueryClientProvider client={queryClient}>
        <props.Component {...props.pageProps}/>
        <Analytics />
      </QueryClientProvider>
    </KBarProvider>
    </>
  );
}
export default App;