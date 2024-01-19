import MaterialSymbolsChatOutlineRounded from "../../Icons/MaterialSymbolsChatOutlineRounded";

type CommentButtonProps = {
  setShowCommentForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CommentButton({
  setShowCommentForm,
}: CommentButtonProps) {
  return (
    <button onClick={() => setShowCommentForm(true)}>
      <MaterialSymbolsChatOutlineRounded />
    </button>
  );
}
