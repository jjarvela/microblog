import { useRef, useState } from "react";
import MaterialSymbolsExpandMoreRounded from "../Icons/MaterialSymbolsExpandMoreRounded";

type DropdownInputProps = {
  items: string[];
  class?: string;
  onChanged?: (value: string, index: number) => void;
  initialIndex?: number;
};

function DropdownInput({
  items,
  class: classAdd,
  onChanged,
  initialIndex,
}: DropdownInputProps) {
  const [selected, setSelected] = useState(
    items[initialIndex ? initialIndex : 0],
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownButton = useRef<HTMLInputElement>(null);

  const handleSetIsOpen = (val: boolean) => {
    // Make the transition have delay only when closing. Couldn't get it to work with just class names.
    if (dropdownButton.current) {
      if (isOpen) dropdownButton.current.style.transitionDelay = "200ms";
      else dropdownButton.current.style.transitionDelay = "0s";
    }
    setIsOpen(val);
  };

  return (
    <div
      className={
        "relative flex select-none flex-col rounded-[1.33rem]" + " " + classAdd
      }
    >
      <div
        className="invisible absolute z-10 max-h-0 w-full translate-y-10 overflow-hidden rounded-b-[1.33rem] border border-t-0 border-black50 bg-white transition-all duration-200 ease-in-out motion-reduce:duration-0 dark:bg-black"
        style={
          (isOpen && {
            visibility: "visible",
            maxHeight: `calc(${items.length} * 2.6rem)`,
            zIndex: "20",
          }) ||
          {}
        }
      >
        {items.map((item, i) => {
          return (
            <button
              className="w-full border-b border-black25 px-4 py-2 first:border-t last:border-b-0 hover:bg-black25 dark:border-white25 dark:hover:bg-white25"
              key={i}
              onClick={() => {
                setSelected(item);
                if (onChanged) onChanged(item, i);
                handleSetIsOpen(false);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
      <input
        type="button"
        className={
          "z-10 rounded-[1.33rem] px-4 py-2 transition-[border-radius] duration-0 hover:bg-black25 motion-reduce:delay-0 dark:hover:bg-white25" +
          " " +
          (isOpen && "z-20 rounded-b-none")
        }
        value={selected}
        onClick={() => {
          handleSetIsOpen(!isOpen);
        }}
        onBlur={(e) => {
          if (!e.target.parentElement?.contains(e.relatedTarget))
            handleSetIsOpen(false);
          else if (document.activeElement === e.target)
            e.target.focus({ preventScroll: true }); // Recapture focus to keep this onBlur working.
        }}
        tabIndex={0}
        ref={dropdownButton}
      />
      <MaterialSymbolsExpandMoreRounded
        width={"1.5rem"}
        height={"1.5rem"}
        className={
          "absolute right-2 top-2 z-10 transition-transform duration-100" +
          " " +
          (isOpen && "z-30 rotate-180")
        }
      />
    </div>
  );
}

export default DropdownInput;
