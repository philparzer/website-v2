import { RoomProvider } from "../liveblocks.config";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useCookie } from "next-cookie";
import MultiplayerScene from "../components/static/MultiplayerScene";
import Layout from "../components/static/IndexLayout";
import { builder } from '@builder.io/sdk'
import HomeBox from "../components/static/HomeBox";
import { BuilderComponent } from "@builder.io/react";
import KBarButton from "../components/kbar/KBarButton";
import { useRegisterActions, createAction } from "kbar";
import { contactActions, legalActions, redirect } from "../components/kbar/kbarActions"
import { FloatingOverlay } from "@floating-ui/react-dom-interactions";

export default function Page(props: any) {
  // const roomId = useOverrideRoomId("nextjs-live-cursors-chat"); //TODO: test this w more than 10
  const cookie = useCookie(props.cookie);
  const router = useRouter();

  let projects = props.links.map((project:any) => {
    return {
      id: project.data.databaseLookup,
      name: project.name,
      section: "Projects",
      perform: () => (
        redirect(window.location, project.data.link.value.data.url, "")
      ),
      thumbnail: project.data.logo
    }
  })

  let actions = contactActions.concat(projects)
  actions = actions.concat(legalActions)

  useRegisterActions(actions, [actions])

  const [isWindows, setIsWindows] = useState(false)

  useEffect(() => {
    if (navigator.userAgent.indexOf('Win') != -1) setIsWindows(true);
  }, [])

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    // <RoomProvider TODO: uncomment to enable multiplayer
    //   id={roomId}
    //   initialPresence={() => ({
    //     cursor: null,
    //     message: "",
    //     username: cookie.has("name") ? cookie.get("name") : "User",
    //     hidden: cookie.has("visibilityPref")
    //       ? !JSON.parse(cookie.get("visibilityPref"))
    //       : false,
    //   })}
    // >
      // <MultiplayerScene>{/*Renders Cursors*/}
      <div className={`${isWindows && "windows-scrollbars"}`}>
        <Layout>
          <HomeBox 
            locale={props.locale}
            projects={props.links} 
            cookie={cookie} 
            about={<BuilderComponent model="about" content={props.about} data={{ locale: props.locale }}/>}
            IAMStrings={props.IAMStrings}
          />
        </Layout>
        </div>
      // </MultiplayerScene>
    // </RoomProvider>
  );
}

// function useOverrideRoomId(roomId: string) {
  
//   const { query } = useRouter();

//   const overrideRoomId = useMemo(() => {
//     return query?.roomId ? `${roomId}-${query.roomId}` : roomId;
//   }, [query, roomId]);

//   return overrideRoomId;
// }


export async function getStaticProps({ params, locale }:any) {
  const urlPath = '/' + (params?.page?.join('/') || '');
  const links = await builder.getAll('project', {
  });
  


  const about = await builder.get('about', { url: urlPath,}).toPromise();

  const IAMStrings = await builder.getAll('i-am', {});

  return {
    props: {
      links: links || null,
      about: about || null,
      IAMStrings: IAMStrings || null,
      locale: locale || null
    },
    revalidate: 5,
  };
}