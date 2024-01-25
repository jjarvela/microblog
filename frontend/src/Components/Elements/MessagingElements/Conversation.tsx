import React from "react";
import { ProfilePicture } from "../ProfilePicture";
import MessageBubble from "./MessageBubble";
import { MaterialSymbolsChevronLeftRounded } from "../../Icons/MaterialSymbolsChevronLeftRounded";

type ConversationProps = {
  recipientName: string;
  recipientHandle: string;
  setClosed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Conversation({
  recipientName,
  recipientHandle,
  setClosed,
}: ConversationProps) {
  return (
    <div className="flex h-[70%] flex-col">
      <div>
        <div className="flex flex-row items-center gap-2 border-y-[1px] border-black50 py-2">
          <button
            className="text-3xl text-black50"
            onClick={() => setClosed(true)}
          >
            <MaterialSymbolsChevronLeftRounded />
          </button>
          <div className="">
            <ProfilePicture width={50} />
          </div>
          <div className="flex w-[90%] flex-col">
            <p className="truncate">{recipientName}</p>
            <small className="text-black50">{recipientHandle}</small>
          </div>
        </div>
      </div>
      <div className="scrollbar-thin flex flex-col overflow-y-scroll p-2">
        <MessageBubble
          text="Lorem ipsum yaddayaddayadda yy kaa koo fdkjglkdjghlkfgjhklgfjlkghjlkghfdkgjkfdlgjhlkfgjhlk"
          time={new Date()}
          sender={false}
        />
        <MessageBubble text="test message" time={new Date()} sender={false} />
        <MessageBubble text="test message" time={new Date()} sender={true} />
        <MessageBubble text="test message" time={new Date()} sender={true} />
        <MessageBubble text="test message" time={new Date()} sender={false} />
        <MessageBubble text="test message" time={new Date()} sender={false} />
        <MessageBubble text="test message" time={new Date()} sender={true} />
      </div>
    </div>
  );
}
