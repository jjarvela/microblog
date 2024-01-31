import { useState } from "react";
import TextAreaInput from "../../Inputs/TextAreaInput";
import TextInput from "../../Inputs/TextInput";
import { IProfileEditableBox } from "./ProfileBoxes";
import ProfileBoxModifyingButton from "./ProfileBoxModifyingButton";

type ProfileTextBoxProps = IProfileEditableBox & IProfileTextBoxData;

export interface IProfileTextBoxData {
  title: string;
  text: string;
}

function ProfileTextBox({
  title,
  text,
  editing,
  index,
  handleDataChange,
}: ProfileTextBoxProps) {
  const [modifying, setModifying] = useState(false);
  const handleEndEdit = () => {
    if (modifying && index !== undefined && handleDataChange) {
      handleDataChange(index, { title: editedTitle, text: editedText });
    }
    setModifying(!modifying);
  };

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedText, setEditedText] = useState(text);

  return (
    <div className="relative flex min-h-[16rem] flex-col gap-4 rounded-xl border border-black50 p-4">
      {editing && modifying ? (
        <>
          <TextInput
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <TextAreaInput
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="h-max w-full"
          />
        </>
      ) : (
        <>
          <h4>{title}</h4>
          <p>{text}</p>
        </>
      )}
      {editing && (
        <ProfileBoxModifyingButton
          modifying={modifying}
          handleEndEdit={handleEndEdit}
        />
      )}
    </div>
  );
}

export default ProfileTextBox;
