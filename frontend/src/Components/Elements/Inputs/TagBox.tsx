import MaterialSymbolsDeleteForeverOutlineRounded from "../../Icons/MaterialSymbolsDeleteForeverOutlineRounded";

type TagBoxProps = {
  text: string;
  onDelete: () => void;
};

function TagBox({ text, onDelete }: TagBoxProps) {
  return (
    <span
      className="flex h-max flex-row items-center gap-1 rounded-full bg-black25 px-2 dark:bg-white25"
      onClick={(e) => e.stopPropagation()}
    >
      #{text}
      <span
        className="cursor-pointer text-black50 hover:text-black75 dark:hover:text-white75"
        onClick={() => onDelete()}
      >
        <MaterialSymbolsDeleteForeverOutlineRounded />
      </span>
    </span>
  );
}

export default TagBox;
