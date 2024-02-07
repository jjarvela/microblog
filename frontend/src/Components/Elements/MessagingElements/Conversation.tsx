import React, { useEffect, useRef, useState } from "react";
import { ProfilePicture } from "../ProfilePicture";
import MessageBubble from "./MessageBubble";
import { MaterialSymbolsChevronLeftRounded } from "../../Icons/MaterialSymbolsChevronLeftRounded";
import { Link, useParams } from "react-router-dom";
import conversationService from "../../../Services/conversationService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { testUserId } from "../../../globalData";
import { useUser } from "../../../UserWrapper";
import EmojiPicker, { Theme, EmojiStyle } from "emoji-picker-react";
import Button from "../Button.tsx";
import TextAreaInput from "../Inputs/TextAreaInput.tsx";
import MaterialSymbolsSentimentSatisfiedOutline from "../../Icons/MaterialSymbolsSentimentSatisfiedOutline";
import MaterialSymbolsAddPhotoAlternateOutlineRounded from "../../Icons/MaterialSymbolsAddPhotoAlternateOutlineRounded";
import MaterialSymbolsSendRounded from "../../Icons/MaterialSymbolsSendRounded";
import { queryClient } from "../../../main.tsx";

type ConversationProps = {
  setClosed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Conversation({ setClosed }: ConversationProps) {
  const id = useParams().id || "0";
  const user = useUser().user;

  const [messageText, setMessageText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  /**
   * Hook that checks for clicks outside element
   * @param callback : what happens when click outside element detected
   * @returns : React reference to the HTML Div element
   */
  const useClickOutside = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node))
          callback();
      };

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    }, [ref, callback]);

    return ref;
  };

  /**
   * useClickOutside hook falicitates closing of emoji picker upon clicking outside of it
   */
  const emojiRef = useClickOutside(() => setShowEmojiPicker(false));

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

  /***
   * New message mutation
   */

  const sendMessageMutation = useMutation({
    mutationKey: ["sendMessage", id],
    mutationFn: () => {
      return conversationService.addNewMessage(parseInt(id), {
        conversation_id: parseInt(id),
        sender_userid: testUserId,
        message: messageText,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
      setMessageText("");
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
          onClick={() => setClosed(true)}
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

      <div className="scrollbar-thin flex h-[80%] flex-col overflow-y-scroll p-2">
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
            {messageQuery.data[0].conversation_messages
              ? (
                  messageQuery.data[0]
                    .conversation_messages as ConversationMessage[]
                ).map((message) => (
                  <MessageBubble
                    sender={testUserId === message.sender_userid}
                    message={message}
                  />
                ))
              : ""}
          </>
        )}
      </div>
      <div className="flex flex-row justify-center gap-2 border-t-[1px] border-solid border-black50 p-2 text-center">
        <span className="px-auto flex flex-row justify-center self-center text-xl text-black50">
          {showEmojiPicker && (
            <div
              ref={emojiRef}
              className="absolute bottom-[6em] left-0 z-[100]"
            >
              <EmojiPicker
                onEmojiClick={(emoji) => {
                  const newText = messageText + emoji.emoji;
                  setMessageText(newText);
                }}
                emojiStyle={EmojiStyle.TWITTER}
                theme={Theme.AUTO}
              />
            </div>
          )}
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <MaterialSymbolsSentimentSatisfiedOutline />
          </button>
          <button>
            <MaterialSymbolsAddPhotoAlternateOutlineRounded />
          </button>
        </span>
        <span className="flex-grow">
          <TextAreaInput
            className="w-full"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </span>
        <span className="self-center">
          <Button
            className="btn-primary aspect-square p-[0.5em] text-lg"
            onClick={() => sendMessageMutation.mutate()}
          >
            <MaterialSymbolsSendRounded />
          </Button>
        </span>
      </div>
    </div>
  );
}
