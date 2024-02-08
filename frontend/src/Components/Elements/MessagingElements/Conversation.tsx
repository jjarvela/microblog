import React, { useEffect, useRef, useState } from "react";
import { ProfilePicture } from "../ProfilePicture";
import MessageBubble from "./MessageBubble";
import { MaterialSymbolsChevronLeftRounded } from "../../Icons/MaterialSymbolsChevronLeftRounded";
import { Link, useNavigate, useParams } from "react-router-dom";
import conversationService from "../../../Services/conversationService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { testUserId } from "../../../globalData";
import { useUser } from "../../../UserWrapper";
import { queryClient } from "../../../main.tsx";
import Chatbox from "./Chatbox.tsx";

type ConversationProps = {
  setClosed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Conversation({ setClosed }: ConversationProps) {
  setClosed(false);
  const id = useParams().id || "0";
  const user = useUser().user;
  const scrollTop = useRef<HTMLDivElement>(null);
  const scrollref = useRef<HTMLSpanElement>(null);

  const [messageText, setMessageText] = useState("");

  const navigate = useNavigate();

  /**
   * Conversation getter
   */
  const conversationQuery = useQuery({
    queryKey: ["conversation", id],
    queryFn: () => {
      return conversationService.getConversation(parseInt(id));
    },
  });

  /**
   * Message getter
   */
  const messageQuery = useQuery({
    queryKey: ["messages", id],
    queryFn: () => {
      return conversationService.getMessages(parseInt(id));
    },
  });

  useEffect(() => {
    scrollref.current &&
      scrollTop.current?.scrollTo({
        top: scrollref.current.offsetTop,
        behavior: "instant",
      });
  }, [messageQuery.data]);

  /***
   * New message mutation
   */

  const sendMessageMutation = useMutation({
    mutationKey: ["sendMessage", id],
    mutationFn: () => {
      return conversationService.addNewMessage(id, {
        conversation_id: parseInt(id),
        sender_userid: testUserId,
        message: messageText,
      });
    },
    onSuccess: () => {
      setMessageText("");
      console.log("mutated");
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
    },
  });

  if (conversationQuery.isError)
    return (
      <div className="flex h-full flex-col">
        <p className="p-4 text-center text-warning">
          Error loading conversation
        </p>
      </div>
    );

  if (conversationQuery.isLoading)
    return (
      <div className="flex h-full flex-col">
        <p className="animate-pulse p-4 text-center text-black50">
          Loading conversation
        </p>
      </div>
    );

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-row items-center gap-2 border-y-[1px] border-black50 py-2">
        <Link
          to={"/messages"}
          className="text-3xl text-black50"
          onClick={() => {
            navigate("/messages");
            setClosed(true);
          }}
        >
          <MaterialSymbolsChevronLeftRounded />
        </Link>
        <div className="">
          <ProfilePicture width={50} />
        </div>
        <div className="flex w-[90%] flex-col">
          <p className="truncate">
            {conversationQuery.data[0].users_conversations_participant_1Tousers
              .screen_name === user?.screenName
              ? conversationQuery.data[0]
                  .users_conversations_participant_2Tousers.screen_name
              : conversationQuery.data[0]
                  .users_conversations_participant_1Tousers.screen_name}
          </p>
          <small className="text-black50">
            {"@"}
            {conversationQuery.data[0].users_conversations_participant_1Tousers
              .username === user?.userName
              ? conversationQuery.data[0]
                  .users_conversations_participant_2Tousers.username
              : conversationQuery.data[0]
                  .users_conversations_participant_1Tousers.username}
          </small>
        </div>
      </div>

      <div
        ref={scrollTop}
        className="scrollbar-thin flex h-[62%] flex-col overflow-y-scroll p-2"
      >
        {messageQuery.isError && (
          <div className="flex h-full flex-col">
            <p className="p-4 text-center text-warning">
              Error loading messages
            </p>
          </div>
        )}

        {messageQuery.isLoading && (
          <div className="flex h-full flex-col">
            <p className="animate-pulse p-4 text-center text-black50">
              Loading messages
            </p>
          </div>
        )}
        {messageQuery.isSuccess && (
          <>
            {messageQuery.data
              ? (messageQuery.data as ConversationMessage[]).map((message) => (
                  <MessageBubble
                    key={message.id + Date.parse(message.timestamp)}
                    sender={testUserId === message.sender_userid}
                    message={message}
                  />
                ))
              : ""}
            <span ref={scrollref} className="h-0 w-full"></span>
          </>
        )}
      </div>
      <Chatbox
        messageText={messageText}
        setMessageText={setMessageText}
        sendMessageMutation={sendMessageMutation}
      />
    </div>
  );
}
