/* 
WHAT:
used to update multiplayer settings for cursors (username, visibility) -> sets cookie and updates presence
*/

import { useForm } from "react-hook-form";
import { useCookie } from "next-cookie";
import { useMyPresence } from "../../liveblocks.config";
import { useState, useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import {
  useFloating,
  useInteractions,
  useDismiss,
  offset,
  flip,
  shift,
  FloatingOverlay
} from "@floating-ui/react-dom-interactions";
import { localizedStaticContent } from "../../localization/dict";

type Props = {
  cookie: string;
  locale: string;
};

export default function CursorCustomizer(props: Props) {
  const cookie = useCookie(props.cookie);
  // const [{ username }, updateMyPresence] = useMyPresence();
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: cookie.has("name") ? cookie.get("name") : "User",
      visibilityPref: cookie.has("visibilityPref")
        ? JSON.parse(cookie.get("visibilityPref"))
        : true,
    },
  });

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom",
    strategy: "fixed",
    middleware: [offset(10), flip(), shift()],
  });

  const dismiss = useDismiss(context, {});

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  //TODO: add interface for data
  const onSubmit = (data: any) => {
    cookie.set("name", data.username);
    cookie.set("visibilityPref", data.visibilityPref);
    // updateMyPresence({
    //   username: data.username,
    //   hidden: !data.visibilityPref,
    // });
  };

  return (
    <>
      <div className="flex items-center group">
        <button
          ref={reference}
          onClick={() => setOpen(!open)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${open ? "fill-white" : "fill-main-black group-hover:fill-white"}`}
          >
            <g clipPath="url(#clip0_228_3)">
              <path
                d="M15.8333 15C15.8333 15.92 15.0867 16.6667 14.1667 16.6667C13.2467 16.6667 12.5 15.92 12.5 15C12.5 14.08 13.2467 13.3334 14.1667 13.3334C15.0867 13.3334 15.8333 14.08 15.8333 15ZM4.16667 12.5C2.78833 12.5 1.66667 13.6217 1.66667 15C1.66667 16.3784 2.78833 17.5 4.16667 17.5H15.8333C17.2117 17.5 18.3333 16.3784 18.3333 15C18.3333 13.6217 17.2117 12.5 15.8333 12.5H4.16667ZM20 15C20 17.3009 18.1342 19.1667 15.8333 19.1667H4.16667C1.86583 19.1667 0 17.3009 0 15C0 12.6992 1.86583 10.8334 4.16667 10.8334H15.8333C18.1342 10.8334 20 12.6992 20 15ZM5.83333 3.33337C4.91333 3.33337 4.16667 4.08004 4.16667 5.00004C4.16667 5.92004 4.91333 6.66671 5.83333 6.66671C6.75333 6.66671 7.5 5.92004 7.5 5.00004C7.5 4.08004 6.75333 3.33337 5.83333 3.33337ZM4.16667 2.50004C2.78833 2.50004 1.66667 3.62171 1.66667 5.00004C1.66667 6.37837 2.78833 7.50004 4.16667 7.50004H15.8333C17.2117 7.50004 18.3333 6.37837 18.3333 5.00004C18.3333 3.62171 17.2117 2.50004 15.8333 2.50004H4.16667ZM20 5.00004C20 7.30087 18.1342 9.16671 15.8333 9.16671H4.16667C1.86583 9.16671 0 7.30087 0 5.00004C0 2.69921 1.86583 0.833374 4.16667 0.833374H15.8333C18.1342 0.833374 20 2.69921 20 5.00004Z"
              />
            </g>
            <defs>
              <clipPath id="clip0_228_3">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        {open && (
          <div className="absolute z-50 bg-white drop-shadow-lg p-5 rounded-xl"
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: "max-content",
          }}
          
          >
            <form
              className="flex flex-col gap-4 items-center text-main-black"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center gap-2">
              <div className="text-sm max-w-[140px] text-center pl-1 font-roboto">{localizedStaticContent.multiplayer[props.locale]}</div>
              <div className="">
              <div className="hidden sm:flex items-center gap-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" className="fill-blue-400" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 18h-2v-6h-2v-2h4v8zm-1-9.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>{localizedStaticContent.enter[props.locale]}</div>
              <div className="hidden sm:flex items-center gap-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" className="fill-blue-400" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 18h-2v-6h-2v-2h4v8zm-1-9.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>{localizedStaticContent.exit[props.locale]}</div>
              </div>
              </div>
                <label className="text-sm mt-8 mb-1 hidden sm:flex">{localizedStaticContent.username[props.locale]}</label>
                <input className="hidden sm:flex border border-main-black p-1  text-center px-3 rounded-full text-md w-32" autoFocus={open} {...register("username")} />
              </div>
              <div className="hidden sm:flex gap-2 items-center">
                <label className="text-sm">{localizedStaticContent.visibility[props.locale]}</label>
                <input
                  type="checkbox"
                  className="bg-red-50 p-1 accent-main-black cursor-pointer"
                  {...register("visibilityPref")}
                />
              </div>
              <div>
                <div className="flex sm:hidden -mt-2 text-sm max-w-[160px] text-center">{localizedStaticContent.mobile[props.locale]}</div>

              </div>
              <button className="hidden  sm:flex bg-cta-grey text-main-black hover:text-white hover:bg-main-black p-1 rounded-full px-3 font-roboto text-base" type="submit">
              {localizedStaticContent.save[props.locale]}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
