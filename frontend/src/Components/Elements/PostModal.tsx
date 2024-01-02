import Button from "./Button";
import { ProfilePicture } from "./ProfilePicture";

type NewPostProps = {
  profileName: string;
  profileImage?: string;
  username: string;
  text: string;
  tags: string[];
  refObject: React.MutableRefObject<HTMLDialogElement | null>;
};

function PostModal({
  profileName,
  profileImage,
  username,
  text,
  tags,
  refObject,
}: NewPostProps) {
  return (
    <dialog
      ref={refObject}
      className="rounded-xl border border-black50 bg-white p-3 backdrop:bg-[#000] backdrop:opacity-50 dark:border-white50 dark:bg-black"
    >
      <div className="flex flex-row items-center gap-4">
        <ProfilePicture width={80} image={profileImage} />
        <h5>{profileName}</h5>
        <p className="text-black50">{username}</p>
      </div>
      <Button class="btn-primary" onClick={() => refObject.current?.close()}>
        Close
      </Button>
    </dialog>
  );
}

export default PostModal;
