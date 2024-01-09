import React from "react";
import { ProfilePicture } from "./ProfilePicture";

type ConversationThumbProps = {
  recipientName: string;
  recipientHandle: string;
  readStatus: boolean;
};

export default function ConversationThumb({
  recipientName,
  recipientHandle,
  readStatus,
}: ConversationThumbProps) {
  return (
    <div className="flex flex-col overflow-hidden border-[1px] border-solid border-black50 p-2">
      <div className="items-between flex flex-row gap-2">
        <div className="flex flex-row items-center gap-2">
          <div className="">
            <ProfilePicture width={50} />
          </div>
          <div className="flex w-[70%] flex-col xl:w-40">
            <p className="truncate">{recipientName}</p>
            <small className="text-black50">{recipientHandle}</small>
          </div>
        </div>
        <div className="flex-grow self-start text-end">
          <p className="text-xs text-black50">{new Date().toLocaleString()}</p>
        </div>
      </div>
      <div className="max-h-[50%] max-w-[80%]">
        <small className={`px-1 pt-2 ${readStatus && "text-black50"}`}>
          Here we have the latest message in the conversation
        </small>
      </div>
    </div>
  );
}
