import { RoomProvider } from "../liveblocks.config";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { useCookie } from "next-cookie";
import MultiplayerScene from "../components/static/MultiplayerScene";
import Layout from "../components/static/IndexLayout";
import { builder } from '@builder.io/sdk'
import HomeBox from "../components/static/HomeBox";
import { BuilderComponent } from "@builder.io/react";

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
        <Layout>
          <HomeBox projects={props.links} cookie={cookie} builder={<BuilderComponent />}/>
        </Layout>
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


export async function getStaticProps() {
  const links = await builder.getAll('project', {
    // You can use options for queries, sorting, and targeting here
    // https://github.com/BuilderIO/builder/blob/main/packages/core/docs/interfaces/GetContentOptions.md
  });

  return {
    props: {
      links: links || null,
    },
    revalidate: 5,
  };
}