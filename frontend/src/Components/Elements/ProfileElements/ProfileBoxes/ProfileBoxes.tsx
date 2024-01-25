import { useState } from "react";
import Button from "../../Button";
import DropdownInput from "../../Inputs/DropdownInput";
import ProfileLinkBox, { ProfileLinkBoxProps } from "./ProfileLinkBox";
import ProfileMediaBox, { ProfileMediaBoxProps } from "./ProfileMediaBox";
import ProfilePostBox, { ProfilePostBoxProps } from "./ProfilePostBox";
import ProfileTextBox, { ProfileTextBoxProps } from "./ProfileTextBox";

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

function PlaceholderBox(props: { height: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dotted border-black50 p-4"
      style={{ height: props.height }}
    ></div>
  );
}

const newBoxTypes = ["Text Box", "Links Box", "Media Box", "Post Box"];

function ProfileBoxes({ boxes, editing, setBoxes }: ProfileBoxesProps) {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggedBox, setDraggedBox] = useState<ProfileBox | null>(null);
  const [draggedHeight, setDraggedHeight] = useState(0);

  const handleDragStart = (
    event: React.DragEvent,
    index: number,
    box: ProfileBox,
  ) => {
    if (!editing) return;
    // event.dataTransfer.setDragImage(event.target as Element, 0, 0); // Maybe fix this later to have an image of the element
    event.dataTransfer.setData("text/plain", JSON.stringify(box));
    const rect = (event.target as Element as Element).getBoundingClientRect();
    setDraggedHeight(rect.height);
    // This 0ms setTimeout somehow sets the drag and drop image to match the element.
    setTimeout(() => {
      // Some old fix work. Keeping it around for now
      // if (setBoxes)
      //   setBoxes(
      //     boxes.map((box) => {
      //       if (box.type === "media") {
      //         box.data = { ...box.data, newHeight: undefined };
      //       }
      //       return box;
      //     }),
      //   );
      setDragOverIndex(index);
      setDraggedBox(box);
      const editedBoxes = boxes;
      editedBoxes.splice(index, 1, { type: "placeholder", data: {} });
      if (setBoxes) setBoxes(editedBoxes);
    }, 0);
  };

  const handleDragEnter = (_event: React.DragEvent, index: number) => {
    if (!editing) return;
    setDragOverIndex(index);
    const editedBoxes = boxes.filter((box) => box.type !== "placeholder");
    editedBoxes.splice(index, 0, {
      type: "placeholder",
      data: {},
    });
    if (setBoxes) setBoxes(editedBoxes);
  };

  const handleDragEnd = () => {
    if (!editing) return;
    const dropData = draggedBox;
    if (dropData?.type === "media") {
      dropData.data.newHeight = draggedHeight;
    }
    const editedBoxes = boxes.filter((box) => box.type !== "placeholder");
    if (dropData) {
      if (dragOverIndex !== null) {
        editedBoxes.splice(dragOverIndex, 0, dropData);
      }
    }
    if (setBoxes) setBoxes(editedBoxes);
    setDragOverIndex(null);
    setDraggedBox(null);
    setDraggedHeight(0);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {boxes.map((box, i) => {
        switch (box.type) {
          case "text":
            return (
              <div
                key={i}
                draggable={editing}
                onDragStart={(e) => handleDragStart(e, i, box)}
                className="relative h-fit"
                onDragEnter={(e) => handleDragEnter(e, i)}
                onDragEnd={() => handleDragEnd()}
              >
                <ProfileTextBox
                  title={box.data.title}
                  text={box.data.text}
                  editing={editing}
                />
              </div>
            );
          case "links":
            return (
              <div
                key={i}
                draggable={editing}
                onDragStart={(e) => handleDragStart(e, i, box)}
                className="relative h-fit"
                onDragEnter={(e) => handleDragEnter(e, i)}
                onDragEnd={() => handleDragEnd()}
              >
                <ProfileLinkBox links={box.data.links} />
              </div>
            );
          case "media":
            return (
              <div
                key={i}
                draggable={editing}
                onDragStart={(e) => handleDragStart(e, i, box)}
                className="relative h-fit"
                onDragEnter={(e) => handleDragEnter(e, i)}
                onDragEnd={() => handleDragEnd()}
              >
                <ProfileMediaBox
                  media={box.data.media}
                  newHeight={box.data.newHeight}
                />
              </div>
            );
          case "post":
            return (
              <div
                key={i}
                draggable={editing}
                onDragStart={(e) => handleDragStart(e, i, box)}
                className="relative h-fit"
                onDragEnter={(e) => handleDragEnter(e, i)}
                onDragEnd={() => handleDragEnd()}
              >
                <ProfilePostBox post={box.data.post} />
              </div>
            );
          case "placeholder":
            return (
              <div
                key={i}
                className="relative h-fit"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDragEnd()}
                onDragEnd={() => handleDragEnd()}
              >
                <PlaceholderBox height={draggedHeight} />
              </div>
            );
          default:
            break;
        }
      })}
      {editing && (
        <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-xl border border-black50 p-4">
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
