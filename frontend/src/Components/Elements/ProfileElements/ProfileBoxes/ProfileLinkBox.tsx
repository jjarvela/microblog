import { Link } from "react-router-dom";
import { IProfileEditableBox } from "./ProfileBoxes";
import ProfileBoxModificationButtons from "./ProfileBoxModificationButtons";
import { useEffect, useRef, useState } from "react";
import TextInput from "../../Inputs/TextInput";
import Button from "../../Button";
import LogosYoutubeIcon from "../../../Icons/LogosYoutubeIcon";
import LogosGithubIcon from "../../../Icons/LogosGithubIcon";
import LogosTwitter from "../../../Icons/LogosTwitter";
import LogosFacebook from "../../../Icons/LogosFacebook";
import PhGlobe from "../../../Icons/PhGlobe";
import MaterialSymbolsDeleteForeverOutlineRounded from "../../../Icons/MaterialSymbolsDeleteForeverOutlineRounded";

const recognizedIconList = [
  { find: "youtube", icon: <LogosYoutubeIcon /> },
  { find: "github", icon: <LogosGithubIcon /> },
  { find: "twitter", icon: <LogosTwitter /> },
  { find: "facebook", icon: <LogosFacebook /> },
];
const defaultIcon = <PhGlobe />;

export type LinkBoxLink = {
  text: string;
  url: string;
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
  handleDelete,
}: ProfileLinkBoxProps) {
  const [modifying, setModifying] = useState(false);
  const handleEndEdit = () => {
    if (modifying && index !== undefined && handleDataChange) {
      handleDataChange(index, { links: editedLinks });
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

  const [editedLinks, setEditedLinks] = useState(links);

  const handleChangeLinks = (
    _event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    newLink: LinkBoxLink,
  ) => {
    setEditedLinks(
      editedLinks.map((link, i) => {
        if (i === index) link = newLink;
        return link;
      }),
    );
  };

  const handleDeleteLink = (index: number) => {
    setEditedLinks(editedLinks.filter((_link, i) => index !== i));
  };

  return (
    <div
      ref={divRef}
      className={"rounded-xl border border-black50" + " " + classAdd}
    >
      <div className="p-2">
        {editing && modifying ? (
          <div className="flex flex-col gap-4">
            {editedLinks.map((link, i) => {
              return (
                <div className="flex flex-col gap-2" key={i}>
                  <div className="flex w-full flex-row items-center gap-2">
                    <p className="text-sm">Text</p>
                    <TextInput
                      value={link.text}
                      onChange={(e) =>
                        handleChangeLinks(e, i, {
                          text: e.target.value,
                          url: link.url,
                        })
                      }
                      className="w-full"
                    />
                    <button
                      className="rounded-full border border-warning p-2 text-lg text-warning
                    opacity-50 hover:opacity-100 dark:border-warningDark dark:text-warningDark"
                      onClick={() => handleDeleteLink(i)}
                    >
                      <MaterialSymbolsDeleteForeverOutlineRounded />
                    </button>
                  </div>
                  <div className="flex w-full flex-row items-center gap-2">
                    <p className="text-sm">URL</p>
                    <TextInput
                      value={link.url}
                      onChange={(e) =>
                        handleChangeLinks(e, i, {
                          text: link.text,
                          url: e.target.value,
                        })
                      }
                      className="w-full"
                    ></TextInput>
                  </div>
                </div>
              );
            })}
            <Button
              className="btn-primary w-fit self-center"
              onClick={() =>
                setEditedLinks([...editedLinks, { text: "", url: "" }])
              }
            >
              Add New Link
            </Button>
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
                  className="flex flex-row items-center gap-4 rounded-lg px-4 py-3 text-lg hover:bg-black25 dark:hover:bg-white25"
                >
                  <span className="flex w-6 flex-row justify-center">
                    {recognizedIconList.reduce(
                      (result, icon) =>
                        link.url.toLowerCase().includes(icon.find)
                          ? icon.icon
                          : result,
                      defaultIcon,
                    )}
                  </span>
                  <p className="overflow-hidden text-ellipsis text-[1.2rem]">
                    {link.text}
                  </p>
                </Link>
              );
            })}
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

export default ProfileLinkBox;
