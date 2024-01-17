import React from "react";
import { ProfilePicture } from "../ProfilePicture";

type ConversationThumbProps = {
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
      recipientName: string;
      recipientHandle: string;
      messages: never[];
    }>
  >;
};

export default function ConversationThumb({
  recipientName,
  recipientHandle,
  readStatus,
  openMessage,
  setOpenMessage,
  setClosed,
}: ConversationThumbProps) {
  return (
    <button
      className="flex w-full flex-col overflow-hidden border-[1px] border-solid border-black50 p-2"
      onClick={() => {
        setOpenMessage({ ...openMessage, recipientName, recipientHandle });
        setClosed(false);
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
          <p className="text-xs text-black50">{new Date().toLocaleString()}</p>
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
    </button>
  );
}
