import { useState } from "react";
import TextAreaInput from "../../Inputs/TextAreaInput";
import TextInput from "../../Inputs/TextInput";
import MaterialSymbolsEditOutlineRounded from "../../../Icons/MaterialSymbolsEditOutlineRounded";
import IonCheckmarkRound from "../../../Icons/IonCheckmarkRound";

export type ProfileTextBoxProps = {
  title: string;
  text: string;
  editing?: boolean;
};

function ProfileTextBox({ title, text, editing }: ProfileTextBoxProps) {
  const [modifying, setModifying] = useState(false);

  return (
    <div className="relative flex min-h-[16rem] flex-col gap-4 rounded-xl border border-black50 p-4">
      {editing && modifying ? (
        <>
          <TextInput value={title} />
          <TextAreaInput text={text} class="h-max w-full" />
        </>
      ) : (
        <>
          <h4>{title}</h4>
          <p>{text}</p>
        </>
      )}
      {editing && (
        <div
          onClick={() => setModifying(!modifying)}
          className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full border border-black50 text-xl opacity-25 hover:opacity-75"
        >
          {modifying ? (
            <IonCheckmarkRound />
          ) : (
            <MaterialSymbolsEditOutlineRounded />
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileTextBox;
