import { useRef, useState } from "react";
import MaterialSymbolsCloseRounded from "../../../Icons/MaterialSymbolsCloseRounded";
import { IProfileEditableBox } from "./ProfileBoxes";
import ProfileBoxModificationButtons from "./ProfileBoxModificationButtons";
import TextInput from "../../Inputs/TextInput";
import Button from "../../Button";

type ProfileMediaBoxProps = IProfileEditableBox & IProfileMediaBoxData;

export interface IProfileMediaBoxData {
  media: Media;
  newHeight?: number;
}

function ProfileMediaBox({
  media,
  newHeight,
  editing,
  index,
  handleDataChange,
  handleDelete,
}: ProfileMediaBoxProps) {
  const [modifying, setModifying] = useState(false);
  const handleEndEdit = () => {
    if (modifying && index !== undefined && handleDataChange) {
      handleDataChange(index, { media: editedMedia });
    }
    setModifying(!modifying);
  };
  const [editedMedia] = useState(media);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const rootDivRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(newHeight || 0);

  // These two try to cleanup unused height property
  window.addEventListener("resize", () => {
    setHeight(0);
  });
  setTimeout(() => {
    setHeight(0);
  }, 1000);

  return (
    <>
      <div
        ref={rootDivRef}
        className="relative min-h-[4rem] cursor-pointer overflow-hidden rounded-xl border border-black50 bg-[#000]"
        onClick={() => dialogRef.current?.showModal()}
        style={height ? { minHeight: height } : {}}
      >
        {editing && modifying ? (
          <div className="flex flex-col flex-wrap gap-4 bg-white p-2 dark:bg-black">
            <TextInput placeholder="Enter media id..." />
            <Button className="btn-primary">Apply</Button>
            <p className="text-sm italic opacity-50">
              Replace eventually with an actual media picker...
            </p>
          </div>
        ) : (
          <>
            {media.type === "img" && (
              <img
                src={media.source}
                className="pointer-events-none h-full w-full bg-cover object-cover object-center"
              />
            )}
            {media.type === "vid" && (
              <video
                src={media.source}
                className="pointer-events-none h-full w-full bg-cover object-contain object-center"
              />
            )}
          </>
        )}
        {editing && (
          <ProfileBoxModificationButtons
            modifying={modifying}
            handleEndEdit={handleEndEdit}
            handleDelete={() => handleDelete(index)}
          />
        )}
      </div>
      <dialog
        ref={dialogRef}
        className="relative h-screen rounded-xl border border-black50 bg-[#000] outline-none backdrop:bg-[#000] backdrop:opacity-50"
      >
        <div
          className="pointer-events-none absolute h-full w-full bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${media.source})` }}
        />
        {media.type === "img" && (
          <img
            id={media.id}
            src={media.source}
            className="relative left-0 top-0 z-10 h-full w-full object-contain backdrop-blur-2xl"
          />
        )}
        {media.type === "vid" && (
          <video
            id={media.id}
            src={media.source}
            controls
            muted
            className="h-full w-full object-contain"
          />
        )}
        <MaterialSymbolsCloseRounded
          onClick={() => dialogRef.current?.close()}
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-lg border-2 border-transparent text-3xl text-black50 opacity-50 drop-shadow transition-all duration-100 hover:border-black50 hover:opacity-100"
        />
      </dialog>
    </>
  );
}

export default ProfileMediaBox;
