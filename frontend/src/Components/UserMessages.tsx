import { useEffect, useRef, useState } from "react";
import { useBreakpoint } from "../Hooks/BreakpointHook.tsx";
import EmojiPicker, { Theme, EmojiStyle } from "emoji-picker-react";
import Button from "./Elements/Button.tsx";
import TextAreaInput from "./Elements/Inputs/TextAreaInput.tsx";
import ConversationThumb from "./Elements/MessagingElements/ConversationThumb.tsx";
import Conversation from "./Elements/MessagingElements/Conversation.tsx";
import NoMessageOpen from "./Elements/MessagingElements/NoMessageOpen.tsx";
import MaterialSymbolsSentimentSatisfiedOutline from "./Icons/MaterialSymbolsSentimentSatisfiedOutline";
import MaterialSymbolsAddPhotoAlternateOutlineRounded from "./Icons/MaterialSymbolsAddPhotoAlternateOutlineRounded";
import MaterialSymbolsSendRounded from "./Icons/MaterialSymbolsSendRounded";
import MaterialSymbolsChatAddOnRounded from "./Icons/MaterialSymbolsChatAddOnRounded.tsx";
import MaterialSymbolsSettingsRounded from "./Icons/MaterialSymbolsSettingsRounded.tsx";
import { Route, Routes } from "react-router";
import NotFound from "./NotFound.tsx";
import { Link } from "react-router-dom";
import MessagingSettings from "./Elements/MessagingElements/MessagingSettings.tsx";

const UserMessages = () => {
  const [openMessage, setOpenMessage] = useState({
    id: "",
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
  const [hideChatbox, setHideChatbox] = useState(false);

  const placeholderConvos = [
    {
      id:
        Math.floor(Math.random() * 1000) +
        "-" +
        Math.floor(Math.random() * 1000),
      recipientName: "Test User ✨",
      recipientHandle: "@testuser",
      readStatus: true,
    },
    {
      id:
        Math.floor(Math.random() * 1000) +
        "-" +
        Math.floor(Math.random() * 1000),
      recipientName: "Fancy User",
      recipientHandle: "@fancyuser",
      readStatus: false,
    },
    {
      id:
        Math.floor(Math.random() * 1000) +
        "-" +
        Math.floor(Math.random() * 1000),
      recipientName: "Dickerson",
      recipientHandle: "@dickerson99",
      readStatus: true,
    },
    {
      id:
        Math.floor(Math.random() * 1000) +
        "-" +
        Math.floor(Math.random() * 1000),
      recipientName: "Spammer McSpamface",
      recipientHandle: "@spamlord",
      readStatus: true,
    },
  ];

  return (
    <div className="h-full overflow-hidden">
      <div className="flex w-full justify-between border-b-[1px] border-b-black50 px-2">
        <h2 className="my-4 text-center">Messaging Hub</h2>
        <div className="flex gap-2 self-center text-lg">
          <Link to={"/messages"} onClick={() => setClosed(false)}>
            <MaterialSymbolsChatAddOnRounded />
          </Link>
          <Link
            to={"/messages/settings"}
            onClick={() => {
              setHideChatbox(true);
              setClosed(false);
            }}
          >
            <MaterialSymbolsSettingsRounded />
          </Link>
        </div>
      </div>
      <div className="h-full w-full xl:flex xl:flex-row">
        <div
          className={`${
            !isXl && !closed && "collapse h-0"
          } scrollbar-thin w-full overflow-y-scroll border-b-[1px] border-solid border-black50 p-2 xl:w-[50%] xl:border-b-0 xl:border-r-[1px]`}
        >
          {placeholderConvos.map((conversation) => (
            <ConversationThumb
              key={conversation.id}
              id={conversation.id}
              recipientName={conversation.recipientName}
              recipientHandle={conversation.recipientHandle}
              readStatus={conversation.readStatus}
              openMessage={openMessage}
              setClosed={setClosed}
              setOpenMessage={setOpenMessage}
            />
          ))}
        </div>
        <div
          className={`${
            !isXl && closed && "collapse"
          } relative flex h-full flex-grow flex-col`}
        >
          <Routes>
            <Route path="" element={<NoMessageOpen setClosed={setClosed} />} />
            <Route
              path=":id"
              element={<Conversation setClosed={setClosed} />}
            />
            <Route
              path="settings"
              element={
                <MessagingSettings
                  setClosed={setClosed}
                  setHideChatbox={setHideChatbox}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {!hideChatbox && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMessages;
