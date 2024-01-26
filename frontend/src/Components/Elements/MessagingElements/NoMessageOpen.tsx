import TextInput from "../Inputs/TextInput.tsx";
import MaterialSymbolsChatAddOnRounded from "../../Icons/MaterialSymbolsChatAddOnRounded.tsx";
import Button from "../Button.tsx";
import { MaterialSymbolsChevronLeftRounded } from "../../Icons/MaterialSymbolsChevronLeftRounded";
import { Link } from "react-router-dom";
import { useBreakpoint } from "../../../Hooks/BreakpointHook.tsx";

type NoMessageOpenProps = {
  setClosed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NoMessageOpen({ setClosed }: NoMessageOpenProps) {
  const { isXl } = useBreakpoint("xl");
  return (
    <div className=" flex h-[70%] flex-col">
      {!isXl && (
        <Link
          to={"/messages"}
          className="text-3xl text-black50"
          onClick={() => setClosed(true)}
        >
          <MaterialSymbolsChevronLeftRounded />
        </Link>
      )}
      <h4 className="p-4 text-center">Start a new conversation</h4>
      <div className="flex justify-center gap-2">
        <TextInput placeholder="Search for users..." />
        <Button class="btn-primary text-2xl">
          <MaterialSymbolsChatAddOnRounded />
        </Button>
      </div>
    </div>
  );
}
