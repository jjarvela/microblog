function TextInput(props: { type?: string; placeholder?: string }) {
  return (
    <input
      className="rounded-full border border-black50 px-4 py-2 invalid:border-red-400 invalid:bg-red-100 hover:border-black75 invalid:hover:border-red-600 focus:border-primary focus:shadow-[0px_0px_5px_2px_var()] focus:shadow-primary focus:outline-none invalid:focus:border-red-600 invalid:focus:shadow-red-500"
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}

export default TextInput;
