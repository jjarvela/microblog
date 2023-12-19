type TextInputProps = {
  type?: string;
  placeholder?: string;
};

function TextInput(props: TextInputProps) {
  return (
    <input
      className="rounded-full px-4 py-2"
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}

export default TextInput;
