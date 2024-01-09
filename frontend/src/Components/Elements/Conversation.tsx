import React from "react";
import MessageBubble from "./MessageBubble";

export default function Conversation() {
  return (
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
  );
}
