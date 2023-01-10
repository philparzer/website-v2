import { RoomProvider } from "../liveblocks.config";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useCookie } from "next-cookie";
import MultiplayerScene from "../components/static/MultiplayerScene";
import Layout from "../components/static/IndexLayout";
import { builder } from "@builder.io/sdk";
import HomeBox from "../components/static/HomeBox";
import { BuilderComponent } from "@builder.io/react";
import KBarButton from "../components/kbar/KBarButton";
import { useRegisterActions, createAction } from "kbar";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import UpdateToast from "../components/static/UpdateToast";
import {
  contactActions,
  legalActions,
  redirect,
} from "../components/kbar/kbarActions";
import { FloatingOverlay } from "@floating-ui/react-dom-interactions";
import Head from "next/head"
import 'react-toastify/dist/ReactToastify.css';
import { localizedStaticContent } from "../localization/dict";

export default function Page(props: any) {
  const roomId = useOverrideRoomId("nextjs-live-cursors-chat"); //TODO: test this w more than 10
  const cookie = useCookie(props.cookie);

  let projects = props.links.map((project: any) => {
    return {
      id: project.data.databaseLookup,
      name: project.name,
      section: "Projects",
      perform: () =>
        redirect(window.location, project.data.link.value.data.url, ""),
      thumbnail: project.data.logo,
    };
  });

  let actions = contactActions.concat(projects);
  actions = actions.concat(legalActions);

  useRegisterActions(actions, [actions]);

  const [isWindows, setIsWindows] = useState(false);

  useEffect(() => {
    toast(<UpdateToast locale={props.locale} content={props.updateToastContent} />, {
      position: window.innerWidth > 640 ? 'top-right' : 'bottom-center',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
      });
    if (navigator.userAgent.indexOf("Win") != -1) setIsWindows(true);
  }, []);


  return (
    
    <>
      <Head>
        <title>{props.locale === "en" || props.locale === "de" ? "Philipp Parzer" : "Филипп Парцер"}</title>
        <meta
          property="og:image"
          content={`/api/og-home?locale=${props.locale}`}
        />
        <meta 
          name="description"
          content={localizedStaticContent.metaHome[props.locale]}
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#ef476a" />
          <meta name="theme-color" content="#EF476A" />
      </Head>
      <RoomProvider
      id={roomId}
      initialPresence={() => ({
        cursor: null,
        message: "",
        username: cookie.has("name") ? cookie.get("name") : "User",
        hidden: cookie.has("visibilityPref")
          ? !JSON.parse(cookie.get("visibilityPref"))
          : false,
      })}
    >
    <MultiplayerScene locale={props.locale}>{/*Renders Cursors*/}
      <div className={`${isWindows && "windows-scrollbars"}`}>
        <Layout>
          <ToastContainer transition={Zoom}/>
          <HomeBox
            locale={props.locale}
            projects={props.links}
            cookie={cookie}
            about={
              <BuilderComponent
                model="about"
                content={props.about}
                data={{ locale: props.locale }}
              />
            }
            IAMStrings={props.IAMStrings}
          />
        </Layout>
      </div>
      </MultiplayerScene>
    </RoomProvider>
    </>
  );
}

function useOverrideRoomId(roomId: string) {

  const { query } = useRouter();

  const overrideRoomId = useMemo(() => {
    return query?.roomId ? `${roomId}-${query.roomId}` : roomId;
  }, [query, roomId]);

  return overrideRoomId;
}

export async function getStaticProps({ params, locale }: any) {
  const urlPath = "/" + (params?.page?.join("/") || "");
  const links = await builder.getAll("project", {});

  const about = await builder.get("about", { url: urlPath }).toPromise();
  const updateToastContent = await builder.getAll("update-toast", {})
  const IAMStrings = await builder.getAll("i-am", {});

  return {
    props: {
      links: links || null,
      about: about || null,
      IAMStrings: IAMStrings || null,
      locale: locale || null,
      updateToastContent: updateToastContent || null
    },
    revalidate: 5,
  };
}
