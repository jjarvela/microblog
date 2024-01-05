type MessageBubbleProps = {
  text: string;
  time: Date;
  sender: boolean;
};

export default function MessageBubble({
  text,
  time,
  sender,
}: MessageBubbleProps) {
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
      >
        <p>{text}</p>
      </div>
      <small
        className={`my-1 text-black50 ${sender ? "self-start" : "self-end"}`}
      >
        {time.toLocaleString()}
      </small>
    </div>
  );
}
