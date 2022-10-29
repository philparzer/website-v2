/* 
WHAT:
used to update multiplayer settings for cursors (username, visibility) -> sets cookie and updates presence
*/

import { useForm } from "react-hook-form";
import { useCookie } from "next-cookie";
import { useMyPresence } from "../liveblocks.config";
import { useState, useRef } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick"

type Props = {
  cookie: string;
};

export default function CursorCustomizer(props: Props) {
  const cookie = useCookie(props.cookie);
  const [{ username }, updateMyPresence] = useMyPresence();
  const [modalvisible, setModalVisible] = useState<boolean>(false);
  

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: cookie.has("name") ? cookie.get("name") : "User",
      visibilityPref: cookie.has("visibilityPref")
        ? JSON.parse(cookie.get("visibilityPref"))
        : true,
    },
  });

  const onModalButtonClick = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  const ref:any = useOutsideClick(closeModal)
  
  //TODO: add interface for data
  const onSubmit = (data: any) => {
    console.log(data);
    cookie.set("name", data.username);
    cookie.set("visibilityPref", data.visibilityPref);
    updateMyPresence({
      username: data.username,
      hidden: !data.visibilityPref,
    });
  };

  return (
    <>
    
    <div className="" ref={ref}>
    <button
        onClick={() => {
          if (modalvisible === false) {onModalButtonClick()}
          else if (modalvisible === true) {closeModal()}
        }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_228_3)">
          <path d="M15.8333 15C15.8333 15.92 15.0867 16.6667 14.1667 16.6667C13.2467 16.6667 12.5 15.92 12.5 15C12.5 14.08 13.2467 13.3334 14.1667 13.3334C15.0867 13.3334 15.8333 14.08 15.8333 15ZM4.16667 12.5C2.78833 12.5 1.66667 13.6217 1.66667 15C1.66667 16.3784 2.78833 17.5 4.16667 17.5H15.8333C17.2117 17.5 18.3333 16.3784 18.3333 15C18.3333 13.6217 17.2117 12.5 15.8333 12.5H4.16667ZM20 15C20 17.3009 18.1342 19.1667 15.8333 19.1667H4.16667C1.86583 19.1667 0 17.3009 0 15C0 12.6992 1.86583 10.8334 4.16667 10.8334H15.8333C18.1342 10.8334 20 12.6992 20 15ZM5.83333 3.33337C4.91333 3.33337 4.16667 4.08004 4.16667 5.00004C4.16667 5.92004 4.91333 6.66671 5.83333 6.66671C6.75333 6.66671 7.5 5.92004 7.5 5.00004C7.5 4.08004 6.75333 3.33337 5.83333 3.33337ZM4.16667 2.50004C2.78833 2.50004 1.66667 3.62171 1.66667 5.00004C1.66667 6.37837 2.78833 7.50004 4.16667 7.50004H15.8333C17.2117 7.50004 18.3333 6.37837 18.3333 5.00004C18.3333 3.62171 17.2117 2.50004 15.8333 2.50004H4.16667ZM20 5.00004C20 7.30087 18.1342 9.16671 15.8333 9.16671H4.16667C1.86583 9.16671 0 7.30087 0 5.00004C0 2.69921 1.86583 0.833374 4.16667 0.833374H15.8333C18.1342 0.833374 20 2.69921 20 5.00004Z" fill="#483434"/>
          </g>
          <defs>
          <clipPath id="clip0_228_3">
          <rect width="20" height="20" fill="white"/>
          </clipPath>
          </defs>
          </svg>
    </button>
      {modalvisible && (
        <div className="absolute bg-white p-3" >
          <form
            className="flex flex-col gap-4 items-start"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <label className="text-sm">Username</label>
              <input className="bg-red-100 p-1" {...register("username")} />
            </div>
            <div className="flex gap-2 items-middle">
              <label className="text-sm">Visible to others</label>
              <input
                type="checkbox"
                className="bg-red-50 p-1"
                {...register("visibilityPref")}
              />
            </div>
            <button className="border px-2" type="submit">
              Save
            </button>
          </form>
        </div>
      )}
      </div>
    </>
  );
}
