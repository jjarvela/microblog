import { ProfilePicture } from "./ProfilePicture";

type ConversationThumbProps = {
  recipientName: string;
  recipient: string;
};

export default function ConversationThumb({
  recipientName,
  recipient,
}: ConversationThumbProps) {
  return (
    <div className="flex flex-col border-[1px] border-solid border-black50 p-2">
      <div className="mr-auto flex flex-row flex-wrap items-center gap-4">
        <div className="mx-auto">
          <ProfilePicture width={50} />
        </div>
        <div className={"mx-auto flex flex-col"}>
          <h5>{recipientName}</h5>
          <p className="text-black50">{recipient}</p>
        </div>
      </div>
      <div className="text-ellipsis">
        <p className="max-w-[80%] text-ellipsis px-1 pt-2">
          Here we have the latest message in the conversation
        </p>
      </div>
    </div>
  );
}
