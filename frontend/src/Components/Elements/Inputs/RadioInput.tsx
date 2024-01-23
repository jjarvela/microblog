type RadioInputProps = {
  inputName: string;
  value: string | number | readonly string[] | undefined;
  selected: string | number | readonly string[] | undefined;
  setSelected: React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >;
  inputStyle?: string;
};

export default function RadioInput({
  inputName,
  value,
  selected,
  setSelected,
  inputStyle,
}: RadioInputProps) {
  return (
    <div className="relative w-full">
      <label
        htmlFor={inputName + "-" + value}
        className={`flex cursor-pointer items-center ${inputStyle}`}
      >
        <span className="flex-grow-1">{value}</span>{" "}
        <div
          className={
            "mx-2 h-6 w-6 rounded-full border border-black50 bg-primary bg-opacity-0" +
            " " +
            (selected === value && "bg-opacity-25")
          }
        >
          <svg
            width={"100%"}
            height={"100%"}
            viewBox="0 0 16 16"
            className={
              "transition-all duration-100 ease-in-out" +
              " " +
              (selected === value ? "fill-primary" : "fill-transparent")
            }
          >
            <circle r={6} cx={8} cy={8} />
          </svg>
        </div>
        <input
          type="radio"
          name={inputName}
          id={inputName + "-" + value}
          className="absolute h-0 w-0 focus:shadow-none"
          checked={selected === value ? true : false}
          value={value}
          onChange={() => {
            selected === value ? setSelected(undefined) : setSelected(value);
          }}
        />
      </label>
    </div>
  );
}
