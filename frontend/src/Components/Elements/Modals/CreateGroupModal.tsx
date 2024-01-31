import { useState } from "react";
import Button from "../Button";
import TagInput from "../Inputs/TagInput";
import TextAreaInput from "../Inputs/TextAreaInput";
import DropdownInput from "../Inputs/DropdownInput";

const mockListOfJoinRules = ["All Allowed", "Join by approval", "Closed"];

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
          <h5 className="mb-4">Group Name</h5>
          <TextAreaInput
            value={`Mammutit`}
            placeholder="Post text..."
            showCount
            maxLength={50}
            className="min-h-[1rem] w-full"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div className="text-center">
          <h5 className="mb-4">Group Description</h5>
          <TextAreaInput
            value={`Me olemme karvaisia mammutteja.`}
            placeholder="Post text..."
            showCount
            maxLength={100}
            className="min-h-[1rem] w-full"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div className="text-center">
          <h5 className="mb-4">Group Hashtags</h5>
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
          <div className="mb-9 flex flex-col items-center gap-3">
            <DropdownInput items={mockListOfJoinRules} class="w-full" />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex h-full flex-row justify-around gap-4">
            <Button
              onClick={() => refObject.current?.close()}
              className="btn-secondary"
            >
              {cancelText}
            </Button>
            <Button
              onClick={() => {
                confirmCallback();
                refObject.current?.close();
              }}
              className="btn-primary"
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
