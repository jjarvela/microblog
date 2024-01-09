import Button from "./Button";

type ConfirmModalProps = {
  message: string;
  confirmText: string;
  cancelText: string;
  confirmCallback: (parameter?: unknown) => void;
  refObject: React.MutableRefObject<HTMLDialogElement | null>;
  children?: React.ReactNode;
};

function ConfirmModal({
  message,
  confirmText,
  cancelText,
  confirmCallback,
  refObject,
  children,
}: ConfirmModalProps) {
  return (
    <dialog
      ref={refObject}
      className="rounded-xl border border-black50 bg-white p-8 backdrop:bg-[#000] backdrop:opacity-50 dark:border-white50 dark:bg-black dark:text-white"
    >
      <div className="flex max-w-md flex-col gap-8">
        <h4 className="text-center">{message}</h4>
        {children}
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
    </dialog>
  );
}

export default ConfirmModal;
