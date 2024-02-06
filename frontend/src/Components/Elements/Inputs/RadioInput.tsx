import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface RadioInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  inputName: string;
  inputValue: string | number | readonly string[] | undefined;
  selected: string | number | readonly string[] | undefined;
  setSelected: React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >;
  inputStyle?: string;
}

export default function RadioInput({
  inputName,
  inputValue,
  selected,
  setSelected,
  inputStyle,
  ...rest
}: RadioInputProps) {
  return (
    <div className="relative w-full">
      <label
        htmlFor={inputName + "-" + inputValue}
        className={`flex cursor-pointer items-center ${inputStyle}`}
      >
        <span className="flex-grow-1">{inputValue}</span>{" "}
        <div
          className={
            "mx-2 h-6 w-6 flex-shrink-0 rounded-full border border-black50 bg-primary bg-opacity-0" +
            " " +
            (selected === inputValue && "bg-opacity-25")
          }
        >
          <svg
            width={"100%"}
            height={"100%"}
            viewBox="0 0 16 16"
            className={
              "transition-all duration-100 ease-in-out" +
              " " +
              (selected === inputValue ? "fill-primary" : "fill-transparent")
            }
          >
            <circle r={6} cx={8} cy={8} />
          </svg>
        </div>
        <input
          type="radio"
          name={inputName}
          id={inputName + "-" + inputValue}
          className="absolute h-0 w-0 focus:shadow-none"
          checked={selected === inputValue ? true : false}
          value={inputValue}
          onChange={() => {
            selected === inputValue
              ? setSelected(undefined)
              : setSelected(inputValue);
          }}
          {...rest}
        />
      </label>
    </div>
  );
}
