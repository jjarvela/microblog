function Button(props: { children?: React.ReactNode, class: string }) {
  return (
    <button className={`${props.class}`}>
      {props.children}
    </button>
  );
}

export default Button;
