import { useEffect, useRef, useState } from "react";
import ConversationThumb from "./Elements/MessagingElements/ConversationThumb.tsx";
import TextAreaInput from "./Elements/Inputs/TextAreaInput.tsx";
import Conversation from "./Elements/MessagingElements/Conversation.tsx";
import MaterialSymbolsSentimentSatisfiedOutline from "./Icons/MaterialSymbolsSentimentSatisfiedOutline";
import MaterialSymbolsAddPhotoAlternateOutlineRounded from "./Icons/MaterialSymbolsAddPhotoAlternateOutlineRounded";
import MaterialSymbolsSendRounded from "./Icons/MaterialSymbolsSendRounded";
import Button from "./Elements/Button.tsx";
import { useBreakpoint } from "../Hooks/BreakpointHook.tsx";
import EmojiPicker, { Theme, EmojiStyle } from "emoji-picker-react";
import MaterialSymbolsChatAddOnRounded from "./Icons/MaterialSymbolsChatAddOnRounded.tsx";
import MaterialSymbolsSettingsRounded from "./Icons/MaterialSymbolsSettingsRounded.tsx";
import TextInput from "./Elements/Inputs/TextInput.tsx";

const UserMessages = () => {
  const [openMessage, setOpenMessage] = useState({
    recipientName: "",
    recipientHandle: "",
    messages: [],
  });

  const useClickOutside = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node))
          callback();
      };

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    }, [ref]);

    return ref;
  };

  const emojiRef = useClickOutside(() => setShowEmojiPicker(false));

  const { isXl } = useBreakpoint("xl");
  const [closed, setClosed] = useState(true);

  const [messageText, setMessageText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div className="h-full overflow-hidden">
      <div className="flex w-full justify-between border-b-[1px] border-b-black50 px-2">
        <h2 className="my-4 text-center">Messaging Hub</h2>
        <div className="flex gap-2 self-center text-lg">
          <MaterialSymbolsChatAddOnRounded />
          <MaterialSymbolsSettingsRounded />
        </div>
      </div>
      <div className="h-full w-full xl:flex xl:flex-row">
        <div
          className={`${
            !isXl && !closed && "collapse h-0"
          } scrollbar-thin w-full overflow-y-scroll border-b-[1px] border-solid border-black50 p-2 xl:w-[50%] xl:border-b-0 xl:border-r-[1px]`}
        >
          <ConversationThumb
            recipientName="Test User ✨"
            recipientHandle="@testuser"
            readStatus={true}
            setClosed={setClosed}
            openMessage={openMessage}
            setOpenMessage={setOpenMessage}
          />
          <ConversationThumb
            recipientName="Fancy User"
            recipientHandle="@fancyuser"
            readStatus={false}
            setClosed={setClosed}
            openMessage={openMessage}
            setOpenMessage={setOpenMessage}
          />
          <ConversationThumb
            recipientName="Dickerson"
            recipientHandle="@dickerson99"
            readStatus={true}
            setClosed={setClosed}
            openMessage={openMessage}
            setOpenMessage={setOpenMessage}
          />
          <ConversationThumb
            recipientName="Spammer McSpamface"
            recipientHandle="@spamlord"
            readStatus={true}
            setClosed={setClosed}
            openMessage={openMessage}
            setOpenMessage={setOpenMessage}
          />
        </div>
        <div
          className={`${
            !isXl && closed && "collapse"
          } relative flex h-full flex-grow flex-col`}
        >
          {!closed ? (
            <Conversation
              recipientName={openMessage.recipientName}
              recipientHandle={openMessage.recipientHandle}
              setClosed={setClosed}
            />
          ) : (
            <div className=" flex h-[70%] flex-col">
              <h4 className="p-4 text-center">Start a new conversation</h4>
              <div className="flex justify-center gap-2">
                <TextInput placeholder="Search for users..." />
                <Button class="btn-primary text-2xl">
                  <MaterialSymbolsChatAddOnRounded />
                </Button>
              </div>
            </div>
          )}
          <div className="flex flex-row justify-center gap-2 border-t-[1px] border-solid border-black50 p-2 text-center">
            <span className="px-auto flex flex-row justify-center self-center text-xl text-black50">
              {showEmojiPicker && (
                <div
                  ref={emojiRef}
                  className="absolute bottom-10 left-0 z-[100]"
                >
                  <EmojiPicker
                    onEmojiClick={(emoji) => {
                      const newText = messageText + emoji.emoji;
                      setMessageText(newText);
                    }}
                    emojiStyle={EmojiStyle.NATIVE}
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
                class="w-full"
                text={messageText}
                charCount={messageText.length}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </span>
            <span className="self-center">
              <Button class="btn-primary aspect-square p-[0.5em] text-lg">
                <MaterialSymbolsSendRounded />
              </Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMessages;
