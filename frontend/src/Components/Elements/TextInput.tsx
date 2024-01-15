type TextInputProps = {
  id?: string;
  type?: string;
  placeholder?: string;
  class?: string;
};

function TextInput(props: TextInputProps) {
  return (
    <input
      id={props.id}
      className={"rounded-full px-4 py-2 " + props.class}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}

export default TextInput;
