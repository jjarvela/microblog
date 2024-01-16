import { useState } from "react";
import Button from "./Button";
import TagInput from "./TagInput";
import TextAreaInput from "./TextAreaInput";
import MaterialSymbolsAddPhotoAlternateOutlineRounded from "../Icons/MaterialSymbolsAddPhotoAlternateOutlineRounded";
import TextInput from "./TextInput";
import UserProfileInfo from "./UserProfileInfo";

type NewPostProps = {
  user: User;
  text: string;
  tags: string[];
  refObject: React.MutableRefObject<HTMLDialogElement | null>;
  mode: "post" | "edit";
};

function PostModal({ user, text, tags, refObject, mode }: NewPostProps) {
  const [newTags, setNewTags] = useState<string[]>(tags);
  return (
    <dialog
      ref={refObject}
      className="rounded-xl border border-black50 bg-white p-8 backdrop:bg-[#000] backdrop:opacity-50 dark:border-white50 dark:bg-black dark:text-white"
    >
      <div className="flex flex-col gap-6">
        {mode === "post" && (
          <div className="flex flex-row items-center gap-4">
            <h3>Post to</h3>
            <UserProfileInfo user={user} />
          </div>
        )}
        <form
          className="flex flex-col gap-6"
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
            class="min-h-[20rem] w-full"
          />
          <Button
            type="button"
            class="btn-primary flex w-fit flex-row items-center gap-2 px-4"
          >
            <span className="text-lg">
              <MaterialSymbolsAddPhotoAlternateOutlineRounded />
            </span>
            Add media...
          </Button>
          <TagInput
            tags={newTags}
            onTagsChanged={(tags) => setNewTags(tags)}
            maxTagLength={20}
            maxTags={20}
            showCount
            class="w-full max-w-[32rem]"
          />
          <div className="flex flex-row gap-4">
            <h5 className="ml-2">Add to group</h5>
            <TextInput class="flex-1" placeholder="Group name..." />
          </div>
          <div className="flex flex-row justify-between">
            <Button
              class="btn-secondary"
              onClick={() => refObject.current?.close()}
              type="button"
            >
              Cancel
            </Button>
            <Button class="btn-primary" type="submit">
              {mode === "post" && "Post"}
              {mode === "edit" && "Edit"}
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default PostModal;
