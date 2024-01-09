import React from "react";
import ConversationThumb from "./Elements/ConversationThumb";
import TextAreaInput from "./Elements/TextAreaInput";
import Conversation from "./Elements/Conversation";
import MaterialSymbolsSentimentSatisfiedOutline from "./Icons/MaterialSymbolsSentimentSatisfiedOutline";
import MaterialSymbolsAddPhotoAlternateOutlineRounded from "./Icons/MaterialSymbolsAddPhotoAlternateOutlineRounded";
import MaterialSymbolsSendRounded from "./Icons/MaterialSymbolsSendRounded";
import Button from "./Elements/Button.tsx";

const UserMessages = () => {
  return (
    <div className="mx-1 h-[94%]">
      <h2>This is the user's messaging hub</h2>
      <div className="flex h-full w-full  flex-col xl:flex-row">
        <div className="scrollbar-thin w-full border-b-[1px] border-solid border-black50 xl:w-[50%] xl:overflow-y-scroll xl:border-b-0 xl:border-r-[1px]">
          <ConversationThumb
            recipientName="Test User ✨"
            recipientHandle="@testuser"
            readStatus={true}
          />
          <ConversationThumb
            recipientName="Fancy User"
            recipientHandle="@fancyuser"
            readStatus={false}
          />
          <ConversationThumb
            recipientName="Dickerson"
            recipientHandle="@dickerson99"
            readStatus={true}
          />
          <ConversationThumb
            recipientName="Spammer McSpamface"
            recipientHandle="@spamlord"
            readStatus={true}
          />
        </div>
        <div className="flex flex-grow flex-col">
          <Conversation />
          <div className="flex flex-row justify-center gap-2 border-t-[1px] border-solid border-black50 p-2 text-center">
            <span className="px-auto flex flex-row justify-center self-center text-xl text-black50">
              <MaterialSymbolsSentimentSatisfiedOutline />
              <MaterialSymbolsAddPhotoAlternateOutlineRounded />
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
