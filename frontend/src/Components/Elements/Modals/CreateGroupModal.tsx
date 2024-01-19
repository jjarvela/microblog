import { useState } from "react";
import Button from "../Button";
import TagInput from "../Inputs/TagInput";
import TextAreaInput from "../Inputs/TextAreaInput";
import ToggleInput from "../Inputs/ToggleInput";

type CreateGroupModalProps = {
  confirmText: string;
  cancelText: string;
  tags: string[];
  confirmCallback: (parameter?: unknown) => void;
  refObject: React.MutableRefObject<HTMLDialogElement | null>;
};

function CreateGroupModal({
  confirmText,
  cancelText,
  tags,
  confirmCallback,
  refObject,
}: CreateGroupModalProps) {
  const [newTags, setNewTags] = useState<string[]>(tags);
  return (
    <dialog
      ref={refObject}
      className="w-9/12 max-w-3xl rounded-xl border border-black50 bg-white p-8 py-3 backdrop:bg-[#000] backdrop:opacity-50 dark:border-white50 dark:bg-black dark:text-white"
    >
      <form
        className="m-3 my-6 flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          refObject.current?.close();
        }}
      >
        <h2 className="text-center">Create Group</h2>
        <div className="text-center">
          <h5>Group Name</h5>
          <TextAreaInput
            text={`Mammutit`}
            placeholder="Post text..."
            showCount
            maxLength={50}
            class="min-h-[1rem] w-full"
          />
        </div>
        <div className="text-center">
          <h5>Group Description</h5>
          <TextAreaInput
            text={`Me olemme karvaisia mammutteja.`}
            placeholder="Post text..."
            showCount
            maxLength={100}
            class="min-h-[1rem] w-full"
          />
        </div>
        <div className="text-center">
          <h5>Group Hashtags</h5>
          <TagInput
            tags={newTags}
            onTagsChanged={(tags) => setNewTags(tags)}
            maxTagLength={20}
            maxTags={20}
            showCount
            class="w-full"
          />
        </div>
        <div className="text-center">
          <h5 className="mb-4">Join Rules</h5>
          <div className="grid grid-cols-2 justify-items-center gap-3">
            <div className="justify-self-auto">
              <p>All Allowed</p>
              <ToggleInput />
            </div>
            <div className="justify-self-auto">
              <p>Join by approval</p>
              <ToggleInput />
            </div>
            <div className="justify-self-auto">
              <p>Closed</p>
              <ToggleInput />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex h-full flex-row justify-around gap-4">
            <Button
              onClick={() => refObject.current?.close()}
              class="btn-secondary"
            >
              {cancelText}
            </Button>
            <Button
              onClick={() => {
                confirmCallback();
                refObject.current?.close();
              }}
              class="btn-primary"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </form>
    </dialog>
  );
}

export default CreateGroupModal;
