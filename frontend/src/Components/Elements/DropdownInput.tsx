import { useState } from "react";
import MaterialSymbolsExpandMoreRounded from "../Icons/MaterialSymbolsExpandMoreRounded";

type DropdownInputProps = {
  items: string[];
  class?: string;
};

function DropdownInput({ items, class: classAdd }: DropdownInputProps) {
  const [selected, setSelected] = useState(items[0]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={
        "relative flex select-none flex-col rounded-[1.33rem]" + " " + classAdd
      }
    >
      <input
        type="button"
        className={
          "z-20 rounded-[1.33rem] px-4 py-2 transition-[border-radius] delay-200 duration-0 hover:bg-black25 motion-reduce:delay-0 dark:hover:bg-white25" +
          " " +
          (isOpen && "rounded-b-none delay-0")
        }
        value={selected}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={(e) => {
          if (!e.relatedTarget) setIsOpen(false);
          else if (document.activeElement === e.target)
            e.target.focus({ preventScroll: true }); // Recapture focus to keep this onBlur working.
        }}
        tabIndex={0}
      />
      <div
        className="invisible absolute z-10 max-h-0 translate-y-10 overflow-hidden rounded-b-[1.33rem] border border-t-0 border-black50 bg-white transition-all duration-200 ease-in-out motion-reduce:duration-0 dark:bg-black"
        style={
          (isOpen && {
            visibility: "visible",
            maxHeight: `calc(${items.length} * 3rem)`,
          }) ||
          {}
        }
      >
        {items.map((item, i) => {
          return (
            <button
              className="w-full border-b border-black25 px-4 py-2 last:border-b-0 hover:bg-black25 dark:border-white25 dark:hover:bg-white25"
              key={i}
              onClick={() => {
                setSelected(item);
                setIsOpen(false);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
      <MaterialSymbolsExpandMoreRounded
        width={"1.5rem"}
        height={"1.5rem"}
        className={
          "absolute right-2 top-2 z-30 transition-transform duration-100" +
          " " +
          (isOpen && "rotate-180")
        }
      />
    </div>
  );
}

export default DropdownInput;
