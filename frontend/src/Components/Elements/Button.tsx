import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode;
  class: string;
}

function Button(props: ButtonProps) {
  return <button className={`${props.class}`}>{props.children}</button>;
}

export default Button;
