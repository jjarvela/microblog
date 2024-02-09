import { useEffect, useRef, useState } from "react";
import MaterialSymbolsCloseSmallRounded from "../../Icons/MaterialSymbolsCloseSmallRounded";
import MaterialSymbolsDeleteForeverOutlineRounded from "../../Icons/MaterialSymbolsDeleteForeverOutlineRounded";
import ConfirmModal from "../Modals/ConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import conversationService from "../../../Services/conversationService";
import MaterialSymbolsEditOutlineRounded from "../../Icons/MaterialSymbolsEditOutlineRounded";
import { useParams } from "react-router";

type MessageBubbleProps = {
  sender: boolean;
  message: ConversationMessage;
};

export default function MessageBubble({ sender, message }: MessageBubbleProps) {
  const id = useParams().id || "0";
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updatedText, setUpdatedText] = useState(message.message);
  const queryClient = useQueryClient();

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

  const editMessageMutation = useMutation({
    mutationKey: ["editMessage", message.id],
    mutationFn: () => {
      return conversationService.editMessage(
        parseInt(id),
        message.id,
        updatedText,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
      setEdit(false);
    },
  });

  const deleteMessageMutation = useMutation({
    mutationKey: ["deleteMessage", message.id],
    mutationFn: () => {
      console.log("delete mutation");
      return conversationService.deleteMessage(parseInt(id), message.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
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
        onContextMenu={(e) => {
          e.preventDefault();
          setShowContextMenu(true);
        }}
      >
        {edit ? (
          <textarea
            style={{ resize: "none" }}
            className="h-max border-none bg-transparent outline-none focus:border-none focus:outline-none"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") editMessageMutation.mutate();
              if (e.key === "Escape") setEdit(false);
            }}
          ></textarea>
        ) : (
          <p>{message.message}</p>
        )}
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
              onClick={() => {
                navigator.clipboard.writeText(message.message);
                setShowContextMenu(false);
              }}
            >
              Copy
            </a>
            {sender && (
              <>
                <a
                  className="flex cursor-pointer gap-2 border-b-[1px] border-b-black50 py-1 text-xs"
                  onClick={() => {
                    setEdit(true);
                    setShowContextMenu(false);
                  }}
                >
                  <MaterialSymbolsEditOutlineRounded />
                  Edit
                </a>
                <a
                  className="flex cursor-pointer gap-2 border-b-[1px] border-b-black50 py-1 text-xs"
                  onClick={() => deleteMessageMutation.mutate()}
                >
                  <MaterialSymbolsDeleteForeverOutlineRounded />
                  <span>Delete</span>
                </a>
              </>
            )}
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
