import React, { useState, useRef, useEffect } from "react";
import { ProfilePicture } from "../ProfilePicture";
import MaterialSymbolsCloseSmallRounded from "../../Icons/MaterialSymbolsCloseSmallRounded";
import MaterialSymbolsMarkEmailUnreadRounded from "../../Icons/MaterialSymbolsMarkEmailUnreadRounded";
import MaterialSymbolsMarkEmailReadRounded from "../../Icons/MaterialSymbolsMarkEmailReadRounded";
import MaterialSymbolsBlock from "../../Icons/MaterialSymbolsBlock";
import MaterialSymbolsDeleteForeverOutlineRounded from "../../Icons/MaterialSymbolsDeleteForeverOutlineRounded";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../UserWrapper";
import ConfirmModal from "../Modals/ConfirmModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import conversationService from "../../../Services/conversationService";
import { queryClient } from "../../../main";
import { testUserId } from "../../../globalData";

type ConversationThumbProps = {
  conversation: Conversation;
  setClosed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ConversationThumb({
  conversation,
  setClosed,
}: ConversationThumbProps) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const user = useUser().user;
  const [readStatus, setReadStatus] = useState(false);

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

  const ref = useClickOutside(() => setShowContextMenu(false));
  const confirmModal = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  /**
   * Message getter
   */
  const messageQuery = useQuery({
    queryKey: ["messages", conversation.id],
    queryFn: async () => {
      const messages = await conversationService.getMessages(conversation.id);
      if (messages.length > 0) {
        setReadStatus(
          !messages[(messages as ConversationMessage[]).length - 1]
            .notification,
        );
        return messages;
      }
      return [];
    },
  });

  /**
   * Delete query
   */
  const deleteConversationMutation = useMutation({
    mutationKey: ["deleteConversation", conversation.id],
    mutationFn: () => {
      return conversationService.deleteConversation(conversation.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations", testUserId],
      });
      setClosed(false);
      navigate("/messages");
    },
  });

  return (
    <div className="relative">
      <Link
        to={`/messages/${conversation.id}`}
        className=" relative flex w-full flex-col overflow-hidden border-[1px] border-solid border-black50 p-2"
        onClick={() => {
          !showContextMenu && setClosed(false);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowContextMenu(true);
        }}
      >
        {/**
         * Recipient info
         */}
        <div className="items-between flex w-full flex-row gap-2">
          <div className="flex flex-row items-center gap-2 text-left">
            <div className="">
              <ProfilePicture width={50} />
            </div>
            <div className="flex w-20 flex-col sm:w-60 xl:w-40">
              <p className="truncate">
                {conversation.users_conversations_participant_1Tousers
                  .username === user?.screenName
                  ? conversation.users_conversations_participant_2Tousers
                      .screen_name
                  : conversation.users_conversations_participant_1Tousers
                      .screen_name}
              </p>
              <small className="text-black50">
                {"@"}
                {conversation.users_conversations_participant_1Tousers
                  .username === user?.userName
                  ? conversation.users_conversations_participant_2Tousers
                      .username
                  : conversation.users_conversations_participant_1Tousers
                      .username}
              </small>
            </div>
          </div>
          {/**
           * Timestamp
           */}
          <div className="flex-1 flex-grow self-start text-end">
            <p className="text-xs text-black50">
              {messageQuery.data && messageQuery.data.length > 0
                ? new Date(
                    Date.parse(
                      messageQuery.data[messageQuery.data.length - 1].timestamp,
                    ),
                  ).toLocaleString()
                : ""}
            </p>
          </div>
        </div>
        {/**
         * Latest message
         */}
        <div className="max-h-[50%] max-w-[80%]">
          <small
            className={`line-clamp-2 px-1 pt-2 text-left ${
              readStatus && "text-black50"
            }`}
          >
            {messageQuery.data && messageQuery.data.length > 0
              ? (messageQuery.data as ConversationMessage[])[
                  messageQuery.data.length - 1
                ].message
              : ""}
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
              className="flex cursor-pointer gap-2  border-b-[1px] border-b-black50 py-1 text-xs"
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
              className="flex cursor-pointer gap-2 border-b-[1px] border-b-black50 py-1 text-xs"
              onClick={() => confirmModal.current?.showModal()}
            >
              <MaterialSymbolsDeleteForeverOutlineRounded />
              <span>Delete</span>
            </a>
            <a
              className="flex cursor-pointer gap-2 border-b-[1px] border-b-black50 py-1 text-xs"
              onClick={() => setShowContextMenu(false)}
            >
              <MaterialSymbolsBlock /> <span>Block</span>
            </a>
          </div>
        </>
      )}
      <ConfirmModal
        refObject={confirmModal}
        message="Are you sure you wish to delete these messages forever?"
        confirmText="Delete"
        cancelText="Cancel"
        confirmCallback={() => deleteConversationMutation.mutate()}
      />
    </div>
  );
}
