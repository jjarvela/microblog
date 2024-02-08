import IonCheckmarkRound from "../../../Icons/IonCheckmarkRound";
import MaterialSymbolsDeleteForeverOutlineRounded from "../../../Icons/MaterialSymbolsDeleteForeverOutlineRounded";
import MaterialSymbolsEditOutlineRounded from "../../../Icons/MaterialSymbolsEditOutlineRounded";

type ProfileBoxModificationButtonsProps = {
  modifying: boolean;
  handleEndEdit: () => void;
  handleDelete: () => void;
  class?: string;
};

function ProfileBoxModificationButtons({
  modifying,
  handleEndEdit,
  handleDelete,
  class: classAdd,
}: ProfileBoxModificationButtonsProps) {
  return (
    <div
      className={
        "flex flex-row justify-between border-t border-black50 border-t-white75 p-2 dark:border-t-black75" +
        " " +
        classAdd
      }
    >
      <div
        onClick={(e) => {
          handleDelete();
          e.stopPropagation();
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-warning text-xl text-warning opacity-25 hover:opacity-75 dark:border-warningDark dark:text-warningDark"
      >
        <MaterialSymbolsDeleteForeverOutlineRounded />
      </div>
      <div
        onClick={(e) => {
          handleEndEdit();
          e.stopPropagation();
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black50 text-xl opacity-25 hover:opacity-75"
      >
        {modifying ? (
          <IonCheckmarkRound />
        ) : (
          <MaterialSymbolsEditOutlineRounded />
        )}
      </div>
    </div>
  );
}

export default ProfileBoxModificationButtons;
