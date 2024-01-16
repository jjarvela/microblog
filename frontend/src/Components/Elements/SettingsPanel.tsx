import { useEffect, useRef, useState } from "react";
import MaterialSymbolsExpandMoreRounded from "../Icons/MaterialSymbolsExpandMoreRounded";
import { useBreakpoint } from "../../Hooks/BreakpointHook";

type SettingsPanelProps = {
  header: string;
  children: React.ReactNode;
  hSlotHeight?: number;
  vSlotHeight?: number;
};

function SettingsPanel({
  header,
  children,
  hSlotHeight,
  vSlotHeight,
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const parent = useRef<HTMLDivElement>(null);
  const slotsParent = useRef<HTMLDivElement>(null);
  const slotsTotalHeight = useRef("9999px");
  const { isSm } = useBreakpoint("sm");

  useEffect(() => {
    slotsTotalHeight.current = slotsParent.current
      ? `${
          slotsParent.current.childElementCount *
          (isSm ? hSlotHeight || 4 : vSlotHeight || 9) // 4 and 9 are the default values.
        }rem`
      : "9999px";
    if (isOpen && slotsParent.current)
      slotsParent.current.style.maxHeight = slotsTotalHeight.current;
  });

  const handleSetIsOpen = (val: boolean) => {
    if (parent.current) {
      if (!isOpen) {
        setTimeout(
          () => parent.current?.classList.remove("overflow-hidden"),
          200,
        );
      } else parent.current.classList.add("overflow-hidden");
    }
    setIsOpen(val);
  };

  return (
    <div className="min-w-fit rounded-xl border border-black50" ref={parent}>
      <div
        className="relative flex flex-row items-center justify-center rounded-t-xl bg-black25 hover:bg-black50 dark:bg-white25"
        onClick={() => handleSetIsOpen(!isOpen)}
      >
        <h3 className="my-2 w-full select-none text-center">{header}</h3>
        <MaterialSymbolsExpandMoreRounded
          className={
            "absolute right-2 transition-transform duration-100" +
            " " +
            (isOpen && "rotate-180")
          }
          width={"2.5rem"}
          height={"2.5rem"}
        />
      </div>
      <div
        className="max-h-0 transition-[max-height] duration-200"
        style={
          (isOpen && {
            maxHeight: slotsTotalHeight.current,
          }) ||
          {}
        }
        ref={slotsParent}
      >
        {children}
      </div>
    </div>
  );
}

export default SettingsPanel;
