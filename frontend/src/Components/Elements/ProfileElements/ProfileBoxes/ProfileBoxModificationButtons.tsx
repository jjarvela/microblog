import IonCheckmarkRound from "../../../Icons/IonCheckmarkRound";
import MaterialSymbolsDeleteForeverOutlineRounded from "../../../Icons/MaterialSymbolsDeleteForeverOutlineRounded";
import MaterialSymbolsEditOutlineRounded from "../../../Icons/MaterialSymbolsEditOutlineRounded";

type ProfileBoxModificationButtonsProps = {
  modifying: boolean;
  handleEndEdit: () => void;
  handleDelete: () => void;
};

function ProfileBoxModificationButtons({
  modifying,
  handleEndEdit,
  handleDelete,
}: ProfileBoxModificationButtonsProps) {
  return (
    <>
      <div
        onClick={(e) => {
          handleDelete();
          e.stopPropagation();
        }}
        className="absolute bottom-2 left-2 flex h-10 w-10 items-center justify-center rounded-full border border-warning text-xl text-warning opacity-25 hover:opacity-75 dark:border-warningDark dark:text-warningDark"
      >
        <MaterialSymbolsDeleteForeverOutlineRounded />
      </div>
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
    </>
  );
}

export default ProfileBoxModificationButtons;
