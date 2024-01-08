import ConversationThumb from "./Elements/ConversationThumb";
import MessageBubble from "./Elements/MessageBubble";
import TextAreaInput from "./Elements/TextAreaInput";

const UserMessages = () => {
  return (
    <div className="mx-1 h-[94%]">
      <h2>This is the user's messaging hub</h2>
      <div className="flex h-full w-full  flex-col lg:flex-row">
        <div className="scrollbar-thin w-full border-b-[1px] border-solid border-black50 lg:w-[50%] lg:overflow-y-scroll lg:border-b-0 lg:border-r-[1px]">
          <ConversationThumb
            recipientName="Test User ✨"
            recipient="@testuser"
          />
          <ConversationThumb
            recipientName="Fancy User"
            recipient="@fancyuser"
          />
          <ConversationThumb
            recipientName="Dickerson"
            recipient="@dickerson99"
          />
          <ConversationThumb
            recipientName="Spammer McSpamface"
            recipient="@spamlord"
          />
        </div>
        <div className="flex flex-grow flex-col">
          <div className="scrollbar-thin flex flex-grow flex-col overflow-y-scroll p-2">
            <MessageBubble
              text="Lorem ipsum yaddayaddayadda yy kaa koo fdkjglkdjghlkfgjhklgfjlkghjlkghfdkgjkfdlgjhlkfgjhlk"
              time={new Date()}
              sender={false}
            />
            <MessageBubble
              text="test message"
              time={new Date()}
              sender={false}
            />
            <MessageBubble
              text="test message"
              time={new Date()}
              sender={true}
            />
            <MessageBubble
              text="test message"
              time={new Date()}
              sender={true}
            />
            <MessageBubble
              text="test message"
              time={new Date()}
              sender={false}
            />
            <MessageBubble
              text="test message"
              time={new Date()}
              sender={false}
            />
            <MessageBubble
              text="test message"
              time={new Date()}
              sender={true}
            />
          </div>
          <div className="border-t-[1px] border-solid border-black50 p-2 text-center">
            <TextAreaInput class="w-[80%] " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMessages;
