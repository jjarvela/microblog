import RadioInput from "./RadioInput";
type RadioInputGroupProps = {
  groupName: string;
  values: Array<string | number | readonly string[] | undefined>;
  selected: string | number | readonly string[] | undefined;
  setSelected: React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >;
  className?: string;
  inputStyle?: string;
};
export default function RadioInputGroup({
  groupName,
  values,
  selected,
  setSelected,
  className,
  inputStyle,
}: RadioInputGroupProps) {
  return (
    <div className={`flex ${className}`}>
      {values.map((value) => {
        return (
          <RadioInput
            key={groupName + value}
            inputName={groupName}
            value={value}
            selected={selected}
            setSelected={setSelected}
            inputStyle={inputStyle}
          />
        );
      })}
    </div>
  );
}
