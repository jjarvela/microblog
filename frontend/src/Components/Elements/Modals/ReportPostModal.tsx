import { useState } from "react";
import Button from "../Button";
import { MaterialSymbolsChevronRightRounded } from "../../Icons/MaterialSymbolsChevronRightRounded";
import RadioInputGroup from "../Inputs/RadioInputGroup";

type ReportPostModalProps = {
  refObject: React.MutableRefObject<HTMLDialogElement | null>;
};

export default function ReportPostModal({ refObject }: ReportPostModalProps) {
  const [nav, setNav] = useState("default");
  const [selected, setSelected] = useState<
    string | number | readonly string[] | undefined
  >(undefined);

  return (
    <dialog
      ref={refObject}
      className="scrollbar-thin overflow-y-auto rounded-xl border border-black50 bg-white p-4 backdrop:bg-[#000] backdrop:opacity-50 dark:border-white50 dark:bg-black dark:text-white"
    >
      {nav === "default" && (
        <>
          <div className="border-b-[1px] border-black50 p-2 dark:border-white50">
            <h4>What type of issue are you reporting?</h4>
          </div>
          <div className="my-2 flex flex-col items-center gap-1">
            <a
              className="flex w-[80%] cursor-pointer items-center border-b-[1px] border-b-black25 p-2 hover:bg-black50 dark:border-b-black50"
              onClick={() => setNav("sensitive")}
            >
              <h5 className="flex-grow">Sensitive or disturbing media</h5>
              <h2>
                <MaterialSymbolsChevronRightRounded />
              </h2>
            </a>
            <a
              className="flex w-[80%] cursor-pointer items-center border-b-[1px] border-b-black25 p-2 hover:bg-black50 dark:border-b-black50"
              onClick={() => setNav("abuse")}
            >
              <h5 className="flex-grow">Abuse & Harrasment</h5>
              <h2>
                <MaterialSymbolsChevronRightRounded />
              </h2>
            </a>
            <a
              className="flex w-[80%] cursor-pointer items-center border-b-[1px] border-b-black25 p-2 hover:bg-black50 dark:border-b-black50"
              onClick={() => setNav("violence")}
            >
              <h5 className="flex-grow">Violent speech</h5>
              <h2>
                <MaterialSymbolsChevronRightRounded />
              </h2>
            </a>
            <a
              className="flex w-[80%] cursor-pointer items-center border-b-[1px] border-b-black25 p-2 hover:bg-black50 dark:border-b-black50"
              onClick={() => setNav("infringement")}
            >
              <h5 className="flex-grow">Privacy or copyright infringement</h5>
              <h2>
                <MaterialSymbolsChevronRightRounded />
              </h2>
            </a>
            <a
              className="flex w-[80%] cursor-pointer items-center border-b-[1px] border-b-black25 p-2 hover:bg-black50 dark:border-b-black50"
              onClick={() => setNav("spam")}
            >
              <h5 className="flex-grow">Spam</h5>
              <h2>
                <MaterialSymbolsChevronRightRounded />
              </h2>
            </a>
          </div>
        </>
      )}
      {nav === "sensitive" && (
        <div className="w-full">
          <div className="border-b-[1px] border-black50 p-2 dark:border-white50">
            <h4>What type of sensitive media does this post include?</h4>
          </div>
          <RadioInputGroup
            groupName="sensitive"
            values={["Gore", "Sexual content", "Animal abuse"]}
            selected={selected}
            setSelected={setSelected}
            className="m-2 mx-auto w-[60%] flex-col gap-4"
            inputStyle="justify-between p-2 border-b-[1px] border-b-black50"
          />
        </div>
      )}

      {nav === "abuse" && (
        <div className="w-full">
          <div className="border-b-[1px] border-black50 p-2 dark:border-white50">
            <h4>What type of abuse does this post include?</h4>
          </div>
          <RadioInputGroup
            groupName="abuse"
            values={["test", "test", "test", "test"]}
            selected={selected}
            setSelected={setSelected}
            className="m-2 mx-auto w-[60%] flex-col gap-4"
            inputStyle="justify-between p-2 border-b-[1px] border-b-black50"
          />
        </div>
      )}

      {nav === "violence" && (
        <div className="w-full">
          <div className="border-b-[1px] border-black50 p-2 dark:border-white50">
            <h4>What type of violent speech does this post include?</h4>
          </div>
          <RadioInputGroup
            groupName="violence"
            values={[
              "Incitement to violence",
              "Threats against an individual or organization",
              "Self-harming ideation",
              "test",
            ]}
            selected={selected}
            setSelected={setSelected}
            className="m-2 mx-auto w-[60%] flex-col gap-4"
            inputStyle="justify-between p-2 border-b-[1px] border-b-black50"
          />
        </div>
      )}

      {nav === "infringement" && (
        <div className="w-full">
          <div className="border-b-[1px] border-black50 p-2 dark:border-white50">
            <h4>What type of infringement does this post include?</h4>
          </div>
          <RadioInputGroup
            groupName="infringement"
            values={[
              "Sharing of third party personal information",
              "Unauthorised sharing of third party entity's information",
              "Unauthorised use of copyrighted text or media",
              "test",
            ]}
            selected={selected}
            setSelected={setSelected}
            className="m-2 mx-auto w-[60%] flex-col gap-4"
            inputStyle="justify-between p-2 border-b-[1px] border-b-black50"
          />
        </div>
      )}

      {nav === "spam" && (
        <div className="w-full">
          <div className="border-b-[1px] border-black50 p-2 dark:border-white50">
            <h4>What type of spam does this post include?</h4>
          </div>
          <RadioInputGroup
            groupName="spam"
            values={[
              "Repetitive comment",
              "Unsolicited self-promotion",
              "Scam",
            ]}
            selected={selected}
            setSelected={setSelected}
            className="m-2 mx-auto w-[60%] flex-col gap-4"
            inputStyle="justify-between p-2 border-b-[1px] border-b-black50"
          />
        </div>
      )}

      {nav === "reported" && (
        <div className="m-2 flex flex-col">
          <h4 className="mb-2">Thank you for your report!</h4>
          <div className="flex-grow text-center">
            <Button
              className="btn-primary w-[80%]"
              onClick={() => {
                setNav("default");
                refObject.current?.close();
              }}
            >
              Ok
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-items-center gap-1">
        {nav !== "reported" && (
          <div className="flex-grow text-center">
            <Button
              className="btn-secondary w-[80%]"
              onClick={() => {
                setNav("default");
                refObject.current?.close();
              }}
            >
              Cancel
            </Button>
          </div>
        )}
        {nav !== "default" && nav !== "reported" && (
          <div className="flex-grow text-center">
            <Button
              className="btn-primary w-[80%]"
              onClick={(e) => {
                e.preventDefault();
                setNav("reported");
              }}
            >
              Report
            </Button>
          </div>
        )}
      </div>
    </dialog>
  );
}
