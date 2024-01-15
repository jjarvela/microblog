import Button from "./Button";
import TextAreaInput from "./TextAreaInput";

type GroupJoinRequestProps = {
  groupName: string;
  groupAdmin: string;
  refObject: React.MutableRefObject<HTMLDialogElement | null>;
};

export default function GroupJoinRequest({
  groupName,
  groupAdmin,
  refObject,
}: GroupJoinRequestProps) {
  return (
    <dialog
      ref={refObject}
      className="rounded-xl border border-black50 bg-white p-8 backdrop:bg-[#000] backdrop:opacity-50 dark:border-white50 dark:bg-black dark:text-white"
    >
      <h2 className="m-3">{groupName} requires permission to join</h2>
      <h4 className="m-3">Message to the admin (recommended)</h4>
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          refObject.current?.close();
        }}
      >
        <TextAreaInput
          text="Can i haz azzez?? ^__^"
          placeholder="Post text..."
          showCount
          maxLength={200}
          class="min-h-[10rem] w-full"
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
            Request
          </Button>
        </div>
      </form>
    </dialog>
  );
}
