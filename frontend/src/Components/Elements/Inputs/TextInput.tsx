type TextInputProps = {
  id?: string;
  type?: string;
  placeholder?: string;
  class?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

function TextInput(props: TextInputProps) {
  return (
    <input
      id={props.id}
      className={"rounded-full px-4 py-2 " + props.class}
      type={props.type}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange && props.onChange(e)}
      value={props.value}
    />
  );
}

export default TextInput;
