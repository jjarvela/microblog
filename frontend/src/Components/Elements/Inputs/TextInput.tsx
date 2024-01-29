type TextInputProps = {
  id?: string;
  type?: string;
  placeholder?: string;
  class?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  autofocus?: boolean;
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
      autoFocus={props.autofocus || false}
      onKeyDown={(e) => props.onKeyDown && props.onKeyDown(e)}
    />
  );
}

export default TextInput;
