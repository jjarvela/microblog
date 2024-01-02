import { MouseEvent } from "react";

type ButtonProps = {
  children?: React.ReactNode;
  class: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (event: MouseEvent) => void;
};

function Button(props: ButtonProps) {
  return (
    <button
      onClick={(e) => (props.onClick ? props.onClick(e) : null)}
      className={`${props.class}`}
      type={props.type}
    >
      {props.children}
    </button>
  );
}

export default Button;
