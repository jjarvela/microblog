import { DetailedHTMLProps, InputHTMLAttributes } from "react";

function TextInput({
  className,
  ...rest
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return <input className={"rounded-full px-4 py-2 " + className} {...rest} />;
}

export default TextInput;
