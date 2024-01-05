import MessageBubble from "./Elements/MessageBubble";

const UserMessages = () => {
  return (
    <div className="mx-1">
      <h2>This is the user's messaging hub</h2>
      <div className="flex h-full w-full  flex-col lg:flex-row">
        <div className="w-30 w-full p-2 lg:w-[50%]">
          this is where the conversation list goes
        </div>
        <div className="flex flex-grow flex-col overflow-y-auto p-2">
          <MessageBubble
            text="Lorem ipsum yaddayaddayadda yy kaa koo fdkjglkdjghlkfgjhklgfjlkghjlkghfdkgjkfdlgjhlkfgjhlk"
            time={new Date()}
            sender={false}
          />
          <MessageBubble text="test message" time={new Date()} sender={false} />
          <MessageBubble text="test message" time={new Date()} sender={true} />
        </div>
      </div>
    </div>
  );
};

export default UserMessages;
