/* 
WHAT:
home screen wrapper, renders multiplayer cursors
*/

import { useMyPresence, useOthers } from "../liveblocks.config";
import { useState, useEffect, useRef } from "react";
import Cursor from "./Cursor";

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

enum CursorMode {
  Hidden,
  Chat,
}

type CursorState =
  | {
      mode: CursorMode.Hidden;
    }
  | {
      mode: CursorMode.Chat;
      message: string;
      previousMessage: string | null;
    };

export default function MultiplayerScene(props: any) {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const [state, setState] = useState<CursorState>({
    mode: CursorMode.Chat,
    message: "",
    previousMessage: null,
  });
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyUp(e: KeyboardEvent) {
      // if (e.key === "t" && state.mode !== CursorMode.Chat) {
      //   setState({ mode: CursorMode.Chat, previousMessage: null, message: "" });
      // }

      if (e.key === "t") {
        setState({ mode: CursorMode.Chat, previousMessage: null, message: "" });
      }

      // if (e.key === "t" && state.mode === CursorMode.Chat) {
      //   if (inputEl.current !== null) {
      //     inputEl.current.focus();
      //   }
      // }
      else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setState({ mode: CursorMode.Hidden });
      }
    }

    window.addEventListener("keyup", onKeyUp);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);

  return (
    <>
      {/*Wrapper*/}
      <div
        className="absolute h-screen w-full"
        // style={{
        //   cursor: "url(cursor.svg) 0 0, auto",
        // }}
        onPointerMove={(event) => {
          event.preventDefault();

          updateMyPresence({
            cursor: {
              x: event.clientX / window.innerWidth,
              y: event.clientY / window.innerHeight,
            },
          });
        }}
        onPointerLeave={() => {
          // 1;
          updateMyPresence({
            cursor: null,
          });
        }}
        onPointerDown={(event) => {
          updateMyPresence({
            cursor: {
              x: event.clientX / window.innerWidth,
              y: event.clientY / window.innerHeight,
            },
          });
          setState((state) => state);
          updateMyPresence({ message: "" });
          setState({ mode: CursorMode.Hidden });
        }}
        onPointerUp={() => {
          setState((state) => state);
        }}
      >
        {/*Cursor*/}
        {cursor && (
          <div
            className="absolute top-0 left-0 z-50"
            style={{
              transform: `translateX(${
                cursor.x * window.innerWidth
              }px) translateY(${cursor.y * window.innerHeight}px)`,
            }}
          >
            {state.mode === CursorMode.Hidden && <></>}

            {state.mode === CursorMode.Chat && (
              <div>
                <div
                  className="absolute top-5 left-2 px-4 py-2 bg-gray-100 text-amber-900 leading-relaxed text-sm z-20"
                  onKeyUp={(e) => e.stopPropagation()}
                  style={{
                    borderRadius: 20,
                  }}
                >
                  {state.previousMessage && <div>{state.previousMessage}</div>}
                  <input
                    className="bg-transparent border-none	outline-none text-amber-900 placeholder-amber-900"
                    autoFocus={true}
                    ref={inputEl}
                    onChange={(e) => {
                      updateMyPresence({ message: e.target.value });
                      setState({
                        mode: CursorMode.Chat,
                        previousMessage: null,
                        message: e.target.value,
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setState({
                          mode: CursorMode.Chat,
                          previousMessage: state.message,
                          message: "",
                        });
                      } else if (e.key === "Escape") {
                        setState({
                          mode: CursorMode.Hidden,
                        });
                      }
                    }}
                    placeholder={state.previousMessage ? "" : "Say something…"}
                    value={state.message}
                    maxLength={50}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {others.map(({ connectionId, presence }) => {
          if (
            presence == null ||
            !presence.cursor ||
            presence.hidden === true
          ) {
            return null;
          }
          //TODO: fix layout shift -> make fixed?
          return (
            <Cursor
              key={connectionId}
              color={COLORS[connectionId % COLORS.length]}
              x={presence.cursor.x * window.innerWidth}
              y={presence.cursor.y * window.innerHeight}
              message={presence.message}
              username={presence.username}
            />
          );
        })}
        {props.children}
      </div>
    </>
  );
}
