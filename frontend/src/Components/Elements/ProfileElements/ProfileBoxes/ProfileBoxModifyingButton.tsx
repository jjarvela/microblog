import IonCheckmarkRound from "../../../Icons/IonCheckmarkRound";
import MaterialSymbolsEditOutlineRounded from "../../../Icons/MaterialSymbolsEditOutlineRounded";

type ProfileBoxModifyingButtonProps = {
  modifying: boolean;
  handleEndEdit: () => void;
};

function ProfileBoxModifyingButton({
  modifying,
  handleEndEdit,
}: ProfileBoxModifyingButtonProps) {
  return (
    <div
      onClick={(e) => {
        handleEndEdit();
        e.stopPropagation();
      }}
      className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full border border-black50 text-xl opacity-25 hover:opacity-75"
    >
      {modifying ? (
        <IonCheckmarkRound />
      ) : (
        <MaterialSymbolsEditOutlineRounded />
      )}
    </div>
  );
}

export default ProfileBoxModifyingButton;
