import { UseMutationResult } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import Button from "../Button.tsx";
import TextAreaInput from "../Inputs/TextAreaInput.tsx";
import EmojiPicker, { Theme, EmojiStyle } from "emoji-picker-react";
import MaterialSymbolsSentimentSatisfiedOutline from "../../Icons/MaterialSymbolsSentimentSatisfiedOutline";
import MaterialSymbolsAddPhotoAlternateOutlineRounded from "../../Icons/MaterialSymbolsAddPhotoAlternateOutlineRounded";
import MaterialSymbolsSendRounded from "../../Icons/MaterialSymbolsSendRounded";

type ChatboxProps = {
  messageText: string;
  setMessageText: React.Dispatch<React.SetStateAction<string>>;
  sendMessageMutation: UseMutationResult<unknown, Error, void, unknown>;
};

export default function Chatbox({
  messageText,
  setMessageText,
  sendMessageMutation,
}: ChatboxProps) {
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

  return (
    <div className="flex flex-row justify-center gap-2 border-t-[1px] border-solid border-black50 p-2 text-center">
      <span className="px-auto flex flex-row justify-center self-center text-xl text-black50">
        {showEmojiPicker && (
          <div ref={emojiRef} className="absolute bottom-[6em] left-0 z-[100]">
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
  );
}
