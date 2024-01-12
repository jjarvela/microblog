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
      onClick={() => setIsOpen(!isOpen)}
    >
      <input
        type="button"
        className={
          "z-20 rounded-[1.33rem] px-4 py-2 hover:bg-black25 dark:hover:bg-white25" +
          " " +
          (isOpen && "rounded-b-none")
        }
        value={selected}
      />
      <div
        className="absolute z-10 hidden translate-y-10 overflow-hidden rounded-b-[1.33rem] border border-t-0 border-black50 bg-white dark:bg-black"
        style={(isOpen && { display: "block" }) || {}}
      >
        {items
          .filter((val) => val !== selected)
          .map((item, i) => {
            return (
              <button
                className="w-full border-b border-black25 px-4 py-2 first:border-t last:border-b-0 hover:bg-black25 dark:border-white25 dark:hover:bg-white25"
                key={i}
                onClick={() => setSelected(item)}
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
