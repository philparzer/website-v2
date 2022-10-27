/* 
WHAT:
used to update multiplayer settings for cursors (username, visibility) -> sets cookie and updates presence
*/

import { useForm } from "react-hook-form";
import { useCookie } from 'next-cookie';
import { useMyPresence } from "../liveblocks.config";

type Props = {
    cookie: string
};

export default function CursorCustomizer(props: Props) {
  const cookie = useCookie(props.cookie);
  const [{ username }, updateMyPresence] = useMyPresence();
  
  const { register, handleSubmit } = useForm({defaultValues: {
    username: cookie.has("name") ? cookie.get("name") : "User",
    visibilityPref: cookie.has("visibilityPref") ? JSON.parse(cookie.get("visibilityPref")) : true,
  }});


  const onSubmit = (data: any) => {
    console.log(data);
    cookie.set("name", data.username)
    cookie.set("visibilityPref", data.visibilityPref)
    updateMyPresence({
        username: data.username,
        hidden: !data.visibilityPref
    })
  };

  return (
    <div className="fixed flex">
      <form className="flex flex-col gap-4 items-start" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
        <label className="text-sm">Username</label>
        <input className="bg-red-50 p-1" {...register("username")} />
        </div>
        <div className="flex gap-2 items-middle">
        <label className="text-sm">Visible to others</label>
        <input type="checkbox" className="bg-red-50 p-1" {...register("visibilityPref")}/>
        </div>
        <button className="border px-2" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
