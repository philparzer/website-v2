import { RoomProvider } from "../liveblocks.config";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { useCookie } from "next-cookie";
import MultiplayerScene from "../components/MultiplayerScene";
import CursorCustomizer from "../components/CursorCustomizer";
import Layout from "../components/IndexLayout";

export default function Page(props: any) {
  const roomId = useOverrideRoomId("nextjs-live-cursors-chat");
  const cookie = useCookie(props.cookie);

  return (
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
      <MultiplayerScene>{/*Renders Cursors*/}
        <Layout>
          <CursorCustomizer cookie={props.cookie} />
        </Layout>
      </MultiplayerScene>
    </RoomProvider>
  );
}

export async function getStaticProps() {
  const API_KEY = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY;
  //TODO:
  const API_KEY_WARNING = process.env.CODESANDBOX_SSE
    ? `Add your public key from https://liveblocks.io/dashboard/apikeys as the \`NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY\` secret in CodeSandbox.\n` +
      `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-live-cursors-chat#codesandbox.`
    : `Create an \`.env.local\` file and add your public key from https://liveblocks.io/dashboard/apikeys as the \`NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY\` environment variable.\n` +
      `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-live-cursors-chat#getting-started.`;

  if (!API_KEY) {
    console.warn(API_KEY_WARNING);
  }

  return { props: {} };
}

//Doesnt affect localhost
function useOverrideRoomId(roomId: string) {
  const { query } = useRouter();
  const overrideRoomId = useMemo(() => {
    return query?.roomId ? `${roomId}-${query.roomId}` : roomId;
  }, [query, roomId]);

  return overrideRoomId;
}
