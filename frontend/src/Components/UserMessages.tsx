import React, { useState } from "react";
import ConversationThumb from "./Elements/MessagingElements/ConversationThumb.tsx";
import TextAreaInput from "./Elements/Inputs/TextAreaInput.tsx";
import Conversation from "./Elements/MessagingElements/Conversation.tsx";
import MaterialSymbolsSentimentSatisfiedOutline from "./Icons/MaterialSymbolsSentimentSatisfiedOutline";
import MaterialSymbolsAddPhotoAlternateOutlineRounded from "./Icons/MaterialSymbolsAddPhotoAlternateOutlineRounded";
import MaterialSymbolsSendRounded from "./Icons/MaterialSymbolsSendRounded";
import Button from "./Elements/Button.tsx";
import { useBreakpoint } from "../Hooks/BreakpointHook.tsx";

const UserMessages = () => {
  const [openMessage, setOpenMessage] = useState({
    recipientName: "",
    recipientHandle: "",
    messages: [],
  });

  const { isXl } = useBreakpoint("xl");
  const [closed, setClosed] = useState(true);

  return (
    <div className="mx-1 h-[94%]">
      <h2>This is the user's messaging hub</h2>
      <div className="h-full w-full xl:flex xl:flex-row">
        <div
          className={`${
            !isXl && !closed && "collapse h-0"
          } scrollbar-thin w-full border-b-[1px] border-solid border-black50 xl:w-[50%] xl:overflow-y-scroll xl:border-b-0 xl:border-r-[1px]`}
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
            <h4 className="p-4 text-center">Start a new conversation</h4>
          )}
          <div className="flex flex-row justify-center gap-2 border-t-[1px] border-solid border-black50 p-2 text-center">
            <span className="px-auto flex flex-row justify-center self-center text-xl text-black50">
              <button>
                <MaterialSymbolsSentimentSatisfiedOutline />
              </button>
              <button>
                <MaterialSymbolsAddPhotoAlternateOutlineRounded />
              </button>
            </span>
            <span className="flex-grow">
              <TextAreaInput class="w-full" />
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
