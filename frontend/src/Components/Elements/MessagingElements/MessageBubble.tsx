import { useEffect, useRef, useState } from "react";
import MaterialSymbolsBlock from "../../Icons/MaterialSymbolsBlock";
import MaterialSymbolsCloseSmallRounded from "../../Icons/MaterialSymbolsCloseSmallRounded";
import MaterialSymbolsDeleteForeverOutlineRounded from "../../Icons/MaterialSymbolsDeleteForeverOutlineRounded";
import ConfirmModal from "../Modals/ConfirmModal";
import { useMutation } from "@tanstack/react-query";
import conversationService from "../../../Services/conversationService";

type MessageBubbleProps = {
  sender: boolean;
  message: ConversationMessage;
};

export default function MessageBubble({ sender, message }: MessageBubbleProps) {
  const [showContextMenu, setShowContextMenu] = useState(false);

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

  const deleteMessageMutation = useMutation({
    mutationKey: ["deleteMessage", message.id],
    mutationFn: () => {
      return conversationService.deleteMessage(message.id);
    },
  });

  return (
    <div
      className={`relative flex w-fit max-w-[90%] flex-col ${
        sender ? "self-end" : "self-start"
      }`}
    >
      <div
        className={`break-words rounded-xl px-6 py-2 ${
          sender
            ? "justify-self-end  rounded-br-sm bg-primary"
            : "dark:  justify-self-start rounded-bl-sm bg-black25 dark:bg-black50"
        }`}
        onContextMenu={() => {
          setShowContextMenu(true);
        }}
      >
        <p>{message.message}</p>
      </div>
      <small
        className={`my-1 text-black50 ${sender ? "self-start" : "self-end"}`}
      >
        {new Date(Date.parse(message.timestamp)).toLocaleString()}
      </small>

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

          <ConfirmModal
            refObject={confirmModal}
            message="Are you sure you wish to delete this messages?"
            confirmText="Delete"
            cancelText="Cancel"
            confirmCallback={() => deleteMessageMutation.mutate()}
          />
        </>
      )}
    </div>
  );
}
