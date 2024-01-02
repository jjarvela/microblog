import Button from "./Button";
import { ProfilePicture } from "./ProfilePicture";
import TextAreaInput from "./TextAreaInput";

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
      className="rounded-xl border border-black50 bg-white p-4 backdrop:bg-[#000] backdrop:opacity-50 dark:border-white50 dark:bg-black dark:text-white"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          <h3>Post to</h3>
          <ProfilePicture width={80} image={profileImage} />
          <h5>{profileName}</h5>
          <p className="text-black50">{username}</p>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            refObject.current?.close();
          }}
        >
          <TextAreaInput
            text={text}
            placeholder="Post text..."
            showCount
            maxLength={500}
          />
          <div className="flex flex-row justify-between">
            <Button
              class="btn-secondary"
              onClick={() => refObject.current?.close()}
              type="button"
            >
              Cancel
            </Button>
            <Button class="btn-primary" type="submit">
              Post
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default PostModal;
