import { RoomProvider } from "../liveblocks.config";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { useCookie } from "next-cookie";
import MultiplayerScene from "../components/static/MultiplayerScene";
import Layout from "../components/static/IndexLayout";
import { builder } from '@builder.io/sdk'
import HomeBox from "../components/static/HomeBox";
import { BuilderComponent } from "@builder.io/react";
import KBarButton from "../components/kbar/KbarButton";

export default function Page(props: any) {
  // const roomId = useOverrideRoomId("nextjs-live-cursors-chat"); //TODO: test this w more than 10
  const cookie = useCookie(props.cookie);

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
      <div className="index">
        
        <Layout>
        <KBarButton />
          <HomeBox 
            projects={props.links} 
            cookie={cookie} 
            about={<BuilderComponent model="about" content={props.about} />}
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


export async function getStaticProps({ params }:any) {
  const urlPath = '/' + (params?.page?.join('/') || '');
  const links = await builder.getAll('project', {
  });
  const about = await builder
    .get('about', { userAttributes: { urlPath } })
    .toPromise();
    const IAMStrings = await builder.getAll('i-am', {
    });
  return {
    props: {
      links: links || null,
      about: about || null,
      IAMStrings: IAMStrings || null,
    },
    revalidate: 5,
  };
}