import { useState } from "react";
import Button from "../../Button";
import DropdownInput from "../../Inputs/DropdownInput";
import ProfileLinkBox, { ProfileLinkBoxProps } from "./ProfileLinkBox";
import ProfileMediaBox, { ProfileMediaBoxProps } from "./ProfileMediaBox";
import ProfilePostBox, { ProfilePostBoxProps } from "./ProfilePostBox";
import ProfileTextBox, { ProfileTextBoxProps } from "./ProfileTextBox";
import BoxDragOverIndicator, { DragoverState } from "./BoxDragoverIndicator";

export type ProfileBox =
  | { type: "text"; data: ProfileTextBoxProps }
  | { type: "links"; data: ProfileLinkBoxProps }
  | { type: "media"; data: ProfileMediaBoxProps }
  | { type: "post"; data: ProfilePostBoxProps }
  | { type: "placeholder"; data: Record<string, never> };

type ProfileBoxesProps = {
  boxes: ProfileBox[];
  editing?: boolean;
  setBoxes?: (boxes: ProfileBox[]) => void;
};

function PlaceholderBox() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dotted border-black50 p-4"></div>
  );
}

const newBoxTypes = ["Text Box", "Links Box", "Media Box", "Post Box"];

function ProfileBoxes({ boxes, editing, setBoxes }: ProfileBoxesProps) {
  const handleOnDrag = (event: React.DragEvent, box: ProfileBox) => {
    event.dataTransfer.setData("box", JSON.stringify(box));
  };
  const [dragover, setDragover] = useState<DragoverState>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragOver = (event: React.DragEvent, index: number) => {
    const rect = (event.target as Element).getBoundingClientRect();
    setDragOverIndex(index);
    if (event.clientX < rect.x + rect.width / 2) {
      setDragover("onLeft");
    } else {
      setDragover("onRight");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {boxes.map((box, i) => {
        switch (box.type) {
          case "text":
            return (
              <div
                key={i}
                draggable
                onDragStart={(e) => handleOnDrag(e, box)}
                className="relative"
                onDragOver={(e) => handleDragOver(e, i)}
                onDragLeave={() => {
                  setDragover(null);
                  setDragOverIndex(null);
                }}
              >
                <ProfileTextBox title={box.data.title} text={box.data.text} />
                {dragOverIndex === i && (
                  <BoxDragOverIndicator over={dragover} />
                )}
              </div>
            );
          case "links":
            return (
              <div
                key={i}
                draggable
                onDragStart={(e) => handleOnDrag(e, box)}
                className="relative"
                onDragOver={(e) => handleDragOver(e, i)}
                onDragLeave={() => {
                  setDragover(null);
                  setDragOverIndex(null);
                }}
              >
                <ProfileLinkBox links={box.data.links} />
                {dragOverIndex === i && (
                  <BoxDragOverIndicator over={dragover} />
                )}
              </div>
            );
          case "media":
            return (
              <div
                key={i}
                draggable
                onDragStart={(e) => handleOnDrag(e, box)}
                className="relative"
                onDragOver={(e) => handleDragOver(e, i)}
                onDragLeave={() => {
                  setDragover(null);
                  setDragOverIndex(null);
                }}
              >
                <ProfileMediaBox media={box.data.media} />
                {dragOverIndex === i && (
                  <BoxDragOverIndicator over={dragover} />
                )}
              </div>
            );
          case "post":
            return (
              <div
                key={i}
                draggable
                onDragStart={(e) => handleOnDrag(e, box)}
                className="relative"
                onDragOver={(e) => handleDragOver(e, i)}
                onDragLeave={() => {
                  setDragover(null);
                  setDragOverIndex(null);
                }}
              >
                <ProfilePostBox post={box.data.post} />
                {dragOverIndex === i && (
                  <BoxDragOverIndicator over={dragover} />
                )}
              </div>
            );
          case "placeholder":
            return (
              <div draggable>
                <PlaceholderBox />
              </div>
            );
          default:
            break;
        }
      })}
      {editing && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-black50 p-4">
          <DropdownInput items={newBoxTypes} class="min-w-[9rem]" />
          <Button class="btn-primary">
            <span className="font-bold">+ </span>Add new
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProfileBoxes;
