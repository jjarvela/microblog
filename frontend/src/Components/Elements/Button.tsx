function Button(props: { children?: React.ReactNode }) {
  return (
    <button className="btn-primary">
      {props.children}
    </button>
  );
}

export default Button;
