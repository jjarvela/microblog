import { Link } from "react-router-dom";
import { IProfileEditableBox } from "./ProfileBoxes";
import ProfileBoxModifyingButton from "./ProfileBoxModifyingButton";
import { useState } from "react";
import TextInput from "../../Inputs/TextInput";
import Button from "../../Button";

export type LinkBoxLink = {
  icon: React.ReactNode;
  text: string;
  url?: string;
};

type ProfileLinkBoxProps = IProfileEditableBox & IProfileLinkBoxData;

export interface IProfileLinkBoxData {
  links: LinkBoxLink[];
  class?: string;
}

function ProfileLinkBox({
  links,
  class: classAdd,
  editing,
  index,
  handleDataChange,
}: ProfileLinkBoxProps) {
  const [modifying, setModifying] = useState(false);
  const handleEndEdit = () => {
    if (modifying && index !== undefined && handleDataChange) {
      handleDataChange(index, { links: editedLinks });
    }
    setModifying(!modifying);
  };

  const [editedLinks, setEditedLinks] = useState(links);

  const handleChangeLinks = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setEditedLinks(
      editedLinks.map((link, i) => {
        if (i === index) link.text = event.target.value;
        return link;
      }),
    );
  };

  return (
    <div className={"rounded-xl border border-black50 p-2" + " " + classAdd}>
      {editing && modifying ? (
        <div className="flex flex-col gap-4">
          {editedLinks.map((link, i) => {
            return (
              <TextInput
                key={i}
                value={link.text}
                onChange={(e) => handleChangeLinks(e, i)}
              />
            );
          })}
          <Button
            className="btn-primary w-fit self-center"
            onClick={() =>
              setEditedLinks([...editedLinks, { icon: "", text: "" }])
            }
          >
            Add new
          </Button>
          <p className="text-sm italic opacity-50">
            Fill out missing features later...
          </p>
        </div>
      ) : (
        <>
          <h4 className="mb-2 text-center">Links</h4>
          {links.map((link, i) => {
            return (
              <Link
                to={link.url || ""}
                key={i}
                draggable="false"
                className="flex flex-row items-center gap-4 rounded-lg px-4 py-3 hover:bg-black25 dark:hover:bg-white25"
              >
                <span className="flex w-6 flex-row justify-center">
                  {link.icon}
                </span>
                <p className="text-[1.2rem]">{link.text}</p>
              </Link>
            );
          })}
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

export default ProfileLinkBox;
