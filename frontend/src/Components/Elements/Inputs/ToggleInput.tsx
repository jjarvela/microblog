import { useState } from "react";

type ToggleInputProps = {
  onToggle?: (val: boolean) => void;
  onByDefault?: boolean;
};

function ToggleInput({ onToggle, onByDefault }: ToggleInputProps) {
  const [isTrue, setIsTrue] = useState(onByDefault);

  const handleSetIsTrue = (val: boolean) => {
    setIsTrue(val);
    if (onToggle) onToggle(val);
  };

  return (
    <div
      className={
        "h-10 w-20 rounded-full border border-black50 bg-primary bg-opacity-0 transition-all duration-200 ease-in-out" +
        " " +
        (isTrue && "bg-opacity-25")
      }
      onClick={() => handleSetIsTrue(!isTrue)}
    >
      <svg
        width={"50%"}
        height={"100%"}
        viewBox="0 0 16 16"
        className={
          "transition-all duration-200 ease-in-out" +
          " " +
          (isTrue ? "translate-x-[100%] fill-primary" : "fill-black50")
        }
      >
        <circle r={6} cx={8} cy={8} />
      </svg>
    </div>
  );
}

export default ToggleInput;
