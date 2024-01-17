import Button from "../Button";

type ReportPostModalProps = {
  refObject: React.MutableRefObject<HTMLDialogElement | null>;
};

export default function ReportPostModal({ refObject }: ReportPostModalProps) {
  return (
    <dialog
      ref={refObject}
      className="rounded-xl border border-black50 bg-white p-4 backdrop:bg-[#000] backdrop:opacity-50 dark:border-white50 dark:bg-black dark:text-white"
    >
      <div className="border-b-[1px] border-black50 p-2 dark:border-white50">
        <h5>What type of issue are you reporting?</h5>
      </div>
      <div className="m-4 flex flex-col">
        <Button
          class="btn-secondary"
          onClick={() => refObject.current?.close()}
        >
          Cancel
        </Button>
      </div>
    </dialog>
  );
}
