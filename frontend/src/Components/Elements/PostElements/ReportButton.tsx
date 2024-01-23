import MaterialSymbolsFlagRounded from "../../Icons/MaterialSymbolsFlagRounded";

type ReportButtonProps = {
  onClick: () => void;
};

export default function ReportButton({ onClick }: ReportButtonProps) {
  return (
    <button onClick={onClick}>
      <MaterialSymbolsFlagRounded />
    </button>
  );
}
