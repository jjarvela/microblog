import { useState } from "react";
import Button from "../../Button";
import DropdownInput from "../../Inputs/DropdownInput";
import ProfileLinkBox, { IProfileLinkBoxData } from "./ProfileLinkBox";
import ProfileMediaBox, { IProfileMediaBoxData } from "./ProfileMediaBox";
import ProfilePostBox, { IProfilePostBoxData } from "./ProfilePostBox";
import ProfileTextBox, { IProfileTextBoxData } from "./ProfileTextBox";
import { emptyPost } from "../../../../globalData";

export type ProfileBox =
  | { type: "text"; data: IProfileTextBoxData }
  | { type: "links"; data: IProfileLinkBoxData }
  | { type: "media"; data: IProfileMediaBoxData }
  | { type: "post"; data: IProfilePostBoxData }
  | { type: "placeholder"; data: Record<string, never> };

type ProfileBoxesProps = {
  boxes: ProfileBox[];
  setBoxes: (boxes: ProfileBox[]) => void;
  editing?: boolean;
};

export interface IProfileEditableBox {
  editing: boolean;
  index: number;
  handleDataChange: (
    index: number,
    data:
      | IProfileTextBoxData
      | IProfileLinkBoxData
      | IProfileMediaBoxData
      | IProfilePostBoxData,
  ) => void;
}

function PlaceholderBox(props: { height: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dotted border-black50 p-4"
      style={{ height: props.height }}
    ></div>
  );
}

const newBoxDisplayTypes = ["Text Box", "Links Box", "Media Box", "Post Box"];
const newBoxTypes = ["text", "links", "media", "post"];

function ProfileBoxes({ boxes, editing, setBoxes }: ProfileBoxesProps) {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggedBox, setDraggedBox] = useState<ProfileBox | null>(null);
  const [draggedHeight, setDraggedHeight] = useState(0);

  const [currentNewType, setCurrentNewType] = useState(newBoxTypes[0]);

  const handleBoxDataChange = (
    index: number,
    data:
      | IProfileTextBoxData
      | IProfileLinkBoxData
      | IProfileMediaBoxData
      | IProfilePostBoxData,
  ) => {
    setBoxes(
      boxes.map((box, i) => {
        if (i === index) {
          box.data = data;
        }
        return box;
      }),
    );
  };

  const handleAddBox = (type: ProfileBox["type"]) => {
    let newBox: ProfileBox = { type: "placeholder", data: {} };
    switch (type) {
      case "text":
        newBox = { type: "text", data: { title: "", text: "" } };
        break;
      case "links":
        newBox = { type: "links", data: { links: [] } };
        break;
      case "media":
        newBox = {
          type: "media",
          data: { media: { id: "", source: "", type: "img" } },
        };
        break;
      case "post":
        newBox = { type: "post", data: { post: emptyPost } };
        break;
      default:
        return;
    }
    setBoxes([...boxes, newBox]);
  };

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
      setBoxes(editedBoxes);
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
    setBoxes(editedBoxes);
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
    setBoxes(editedBoxes);
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
                  editing={editing || false}
                  index={i}
                  handleDataChange={handleBoxDataChange}
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
                <ProfileLinkBox
                  links={box.data.links}
                  editing={editing || false}
                  index={i}
                  handleDataChange={handleBoxDataChange}
                />
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
                  editing={editing || false}
                  index={i}
                  handleDataChange={handleBoxDataChange}
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
                <ProfilePostBox
                  post={box.data.post}
                  editing={editing || false}
                  index={i}
                  handleDataChange={handleBoxDataChange}
                />
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
          <DropdownInput
            items={newBoxDisplayTypes}
            class="min-w-[9rem]"
            onChange={(_val, i) => setCurrentNewType(newBoxTypes[i])}
          />
          <Button
            class="btn-primary"
            onClick={() => handleAddBox(currentNewType as ProfileBox["type"])}
          >
            <span className="font-bold">+ </span>Add new
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProfileBoxes;
