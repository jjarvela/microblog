import { MaterialSymbolsChevronLeftRounded } from "../../Icons/MaterialSymbolsChevronLeftRounded";
import { Link } from "react-router-dom";
import RadioInputGroup from "../Inputs/RadioInputGroup";

type MessagingSettingsProps = {
  setClosed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MessagingSettings({
  setClosed,
}: MessagingSettingsProps) {
  return (
    <div className="flex flex-col gap-2">
      <Link
        to={"/messages"}
        className="text-3xl text-black50"
        onClick={() => {
          setClosed(true);
        }}
      >
        <MaterialSymbolsChevronLeftRounded />
      </Link>
      <div className="mx-auto flex w-[80%] flex-col justify-center">
        <div className="mb-2 w-full border-b-[1px] border-b-black50 pb-4">
          <h5>Who can message you?</h5>
        </div>
        <RadioInputGroup
          groupName="message-permissions"
          values={["Everyone", "People I follow", "Nobody"]}
          selected={"Everyone"}
          setSelected={() => {
            return;
          }}
          className="flex w-full flex-col gap-2"
          inputStyle="flex-shrink-0 w-[80%] flex-row-reverse justify-between border-b-[1px] p-4 border-b-black50"
        />
      </div>
    </div>
  );
}
