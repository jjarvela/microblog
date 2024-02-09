import Button from "../Button";
import TextAreaInput from "../Inputs/TextAreaInput";

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
      <h4 className="m-3">Message to the admin (recommended):</h4>
      <form
        className="m-3 my-6 flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          refObject.current?.close();
        }}
      >
        <TextAreaInput
          value={``}
          placeholder="Dear Admin... Could I have access? I'm a really nice person."
          showCount
          maxLength={200}
          className="min-h-[10rem] w-full"
          onChange={(e) => console.log(e.target.value)}
        />
        <div className="flex flex-row justify-between">
          <Button
            className="btn-secondary"
            onClick={() => refObject.current?.close()}
            type="button"
          >
            Cancel
          </Button>
          <Button className="btn-primary" type="submit">
            Request
          </Button>
        </div>
      </form>
    </dialog>
  );
}
