import { useEffect, useRef, useState } from "react";
import TextAreaInput from "../../Inputs/TextAreaInput";
import TextInput from "../../Inputs/TextInput";
import { IProfileEditableBox } from "./ProfileBoxes";
import ProfileBoxModificationButtons from "./ProfileBoxModificationButtons";

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
  handleDelete,
}: ProfileTextBoxProps) {
  const [modifying, setModifying] = useState(false);
  const handleEndEdit = () => {
    if (modifying && index !== undefined && handleDataChange) {
      handleDataChange(index, { title: editedTitle, text: editedText });
    }
    setModifying(!modifying);
  };

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (divRef.current) {
      if (
        modifying &&
        divRef.current.parentElement &&
        divRef.current.parentElement.draggable
      ) {
        divRef.current.parentElement!.draggable = false;
      } else if (
        divRef.current.parentElement &&
        !divRef.current.parentElement.draggable
      ) {
        divRef.current.parentElement.draggable = true;
      }
    }
  }, [modifying]);

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedText, setEditedText] = useState(text);

  return (
    <div
      ref={divRef}
      className="relative flex flex-col rounded-xl border border-black50"
    >
      <div className="flex flex-col gap-4 p-4">
        {editing && modifying ? (
          <>
            <TextInput
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              maxLength={50}
            />
            <TextAreaInput
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="h-max max-h-[20rem] min-h-[4rem] w-full"
              grow
              maxLength={1000}
              showCount
            />
          </>
        ) : (
          <>
            <h4 className="break-words">{title}</h4>
            <p className="whitespace-pre-wrap">{text}</p>
          </>
        )}
      </div>
      {editing && (
        <ProfileBoxModificationButtons
          modifying={modifying}
          handleEndEdit={handleEndEdit}
          handleDelete={() => handleDelete(index)}
        />
      )}
    </div>
  );
}

export default ProfileTextBox;
