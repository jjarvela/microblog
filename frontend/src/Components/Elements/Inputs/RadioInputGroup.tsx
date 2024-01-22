import RadioInput from "./RadioInput";
type RadioInputGroupProps = {
  groupName: string;
  values: Array<string | number | readonly string[] | undefined>;
  selected: string | number | readonly string[] | undefined;
  setSelected: React.Dispatch<
    React.SetStateAction<string | number | readonly string[] | undefined>
  >;
};
export default function RadioInputGroup({
  groupName,
  values,
  selected,
  setSelected,
}: RadioInputGroupProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      {values.map((value) => {
        return (
          <RadioInput
            key={groupName + value}
            inputName={groupName}
            value={value}
            selected={selected}
            setSelected={setSelected}
          />
        );
      })}
    </div>
  );
}
