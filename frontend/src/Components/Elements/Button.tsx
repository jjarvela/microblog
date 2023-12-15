function Button(props: { children?: React.ReactNode }) {
  return (
    <button className="from-primaryFrom to-primaryTo font-heading m-4 rounded-full bg-gradient-to-r px-5 py-2 text-lg font-light text-white drop-shadow-md hover:from-[#EF5030] hover:to-[#F27A25]">
      {props.children}
    </button>
  );
}

export default Button;
