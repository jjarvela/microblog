import React, { useState, useRef, useEffect } from "react";
import { ProfilePicture } from "../ProfilePicture";
import MaterialSymbolsCloseSmallRounded from "../../Icons/MaterialSymbolsCloseSmallRounded";
import MaterialSymbolsMarkEmailUnreadRounded from "../../Icons/MaterialSymbolsMarkEmailUnreadRounded";
import MaterialSymbolsMarkEmailReadRounded from "../../Icons/MaterialSymbolsMarkEmailReadRounded";
import MaterialSymbolsBlock from "../../Icons/MaterialSymbolsBlock";
import MaterialSymbolsDeleteForeverOutlineRounded from "../../Icons/MaterialSymbolsDeleteForeverOutlineRounded";
import { Link } from "react-router-dom";

type ConversationThumbProps = {
  id: string;
  recipientName: string;
  recipientHandle: string;
  readStatus: boolean;
  setClosed: React.Dispatch<React.SetStateAction<boolean>>;
  openMessage: {
    recipientName: string;
    recipientHandle: string;
    messages: never[];
  };
  setOpenMessage: React.Dispatch<
    React.SetStateAction<{
      id: string;
      recipientName: string;
      recipientHandle: string;
      messages: never[];
    }>
  >;
};

export default function ConversationThumb({
  id,
  recipientName,
  recipientHandle,
  readStatus,
  openMessage,
  setOpenMessage,
  setClosed,
}: ConversationThumbProps) {
  const [showContextMenu, setShowContextMenu] = useState(false);

  const useClickOutside = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node))
          callback();
      };

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    }, [ref]);

    return ref;
  };

  const ref = useClickOutside(() => setShowContextMenu(false));

  return (
    <div className="relative">
      <Link
        to={`/messages/${id}`}
        state={{ conversation: { id, recipientName, recipientHandle } }}
        className=" relative flex w-full flex-col overflow-hidden border-[1px] border-solid border-black50 p-2"
        onClick={() => {
          !showContextMenu &&
            setOpenMessage({
              ...openMessage,
              id,
              recipientName,
              recipientHandle,
            });
          !showContextMenu && setClosed(false);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowContextMenu(true);
        }}
      >
        <div className="items-between flex w-full flex-row gap-2">
          <div className="flex flex-row items-center gap-2 text-left">
            <div className="">
              <ProfilePicture width={50} />
            </div>
            <div className="flex w-20 flex-col sm:w-60 xl:w-40">
              <p className="truncate">{recipientName}</p>
              <small className="text-black50">{recipientHandle}</small>
            </div>
          </div>
          <div className="flex-1 flex-grow self-start text-end">
            <p className="text-xs text-black50">
              {new Date().toLocaleString()}
            </p>
          </div>
        </div>
        <div className="max-h-[50%] max-w-[80%]">
          <small
            className={`line-clamp-2 px-1 pt-2 text-left ${
              readStatus && "text-black50"
            }`}
          >
            Here we have the latest message in the conversation
          </small>
        </div>
      </Link>
      {showContextMenu && (
        <>
          <div
            className="absolute right-0 top-0 z-30 cursor-pointer"
            onClick={() => setShowContextMenu(false)}
          >
            <MaterialSymbolsCloseSmallRounded className="text-lg" />
          </div>
          <div
            ref={ref}
            className="absolute right-0 top-2 z-20 flex flex-col justify-center rounded-xl border border-black50 bg-white p-2 dark:border-white50 dark:bg-black dark:text-white"
          >
            <a
              className="flex gap-2  border-b-[1px] border-b-black50 py-1 text-xs"
              onClick={() => setShowContextMenu(false)}
            >
              {readStatus ? (
                <MaterialSymbolsMarkEmailUnreadRounded />
              ) : (
                <MaterialSymbolsMarkEmailReadRounded />
              )}{" "}
              <span>Mark as {readStatus ? "unread" : "read"}</span>
            </a>
            <a
              className="flex gap-2 border-b-[1px] border-b-black50 py-1 text-xs"
              onClick={() => setShowContextMenu(false)}
            >
              <MaterialSymbolsDeleteForeverOutlineRounded />
              <span>Delete</span>
            </a>
            <a
              className="flex gap-2 border-b-[1px] border-b-black50 py-1 text-xs"
              onClick={() => setShowContextMenu(false)}
            >
              <MaterialSymbolsBlock /> <span>Block</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
