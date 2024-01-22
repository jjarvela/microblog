import { useState } from "react";
import Button from "../Button";
import { MaterialSymbolsChevronRightRounded } from "../../Icons/MaterialSymbolsChevronRightRounded";
import RadioInputGroup from "../Inputs/RadioInputGroup";

type ReportPostModalProps = {
  refObject: React.MutableRefObject<HTMLDialogElement | null>;
};

export default function ReportPostModal({ refObject }: ReportPostModalProps) {
  const [selected, setSelected] = useState<
    string | number | readonly string[] | undefined
  >(undefined);

  return (
    <dialog
      ref={refObject}
      className="rounded-xl border border-black50 bg-white p-4 backdrop:bg-[#000] backdrop:opacity-50 dark:border-white50 dark:bg-black dark:text-white"
    >
      <div className="border-b-[1px] border-black50 p-2 dark:border-white50">
        <h4>What type of issue are you reporting?</h4>
      </div>
      <div className="m-4 flex flex-col items-center gap-1">
        <a className="flex w-[80%] cursor-pointer items-center">
          <h5 className="flex-grow">Sensitive or disturbing media</h5>
          <h2>
            <MaterialSymbolsChevronRightRounded />
          </h2>
        </a>
        <a className="flex w-[80%] cursor-pointer items-center">
          <h5 className="flex-grow">Abuse & Harrasment</h5>
          <h2>
            <MaterialSymbolsChevronRightRounded />
          </h2>
        </a>
        <a className="flex w-[80%] cursor-pointer items-center">
          <h5 className="flex-grow">Violent speech</h5>
          <h2>
            <MaterialSymbolsChevronRightRounded />
          </h2>
        </a>
        <a className="flex w-[80%] cursor-pointer items-center">
          <h5 className="flex-grow">Privacy infringement</h5>
          <h2>
            <MaterialSymbolsChevronRightRounded />
          </h2>
        </a>
        <a className="flex w-[80%] cursor-pointer items-center">
          <h5 className="flex-grow">Spam</h5>
          <h2>
            <MaterialSymbolsChevronRightRounded />
          </h2>
        </a>

        <RadioInputGroup
          groupName="test"
          values={[1, 2, 3]}
          selected={selected}
          setSelected={setSelected}
        />
        <span>{selected}</span>

        <Button
          class="btn-secondary w-[80%]"
          onClick={() => refObject.current?.close()}
        >
          Cancel
        </Button>
      </div>
    </dialog>
  );
}
