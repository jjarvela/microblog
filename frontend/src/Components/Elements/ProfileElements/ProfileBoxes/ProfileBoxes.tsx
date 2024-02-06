import { useState } from "react";
import Button from "../../Button";
import DropdownInput from "../../Inputs/DropdownInput";
import ProfileLinkBox, { IProfileLinkBoxData } from "./ProfileLinkBox";
import ProfileMediaBox, { IProfileMediaBoxData } from "./ProfileMediaBox";
import ProfilePostBox, { IProfilePostBoxData } from "./ProfilePostBox";
import ProfileTextBox, { IProfileTextBoxData } from "./ProfileTextBox";
import { emptyPost } from "../../../../globalData";
import { useUser } from "../../../../UserWrapper";

export type ProfileBox =
  | { type: "text"; data: IProfileTextBoxData }
  | { type: "links"; data: IProfileLinkBoxData }
  | { type: "media"; data: IProfileMediaBoxData }
  | { type: "post"; data: IProfilePostBoxData }
  | { type: "placeholder"; data: Record<string, never> };

type ProfileBoxesProps = {
  boxes: ProfileBox[];
  setBoxes: (boxes: ProfileBox[]) => void;
  owned?: boolean;
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

function ProfileBoxes({ boxes, setBoxes, owned }: ProfileBoxesProps) {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggedBox, setDraggedBox] = useState<ProfileBox | null>(null);
  const [draggedHeight, setDraggedHeight] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const [currentNewType, setCurrentNewType] = useState(newBoxTypes[0]);

  const [newBoxes, setNewBoxes] = useState(boxes);
  const [isEditing, setIsEditing] = useState(false);
  const user = useUser();

  const handleBoxDataChange = (
    index: number,
    data:
      | IProfileTextBoxData
      | IProfileLinkBoxData
      | IProfileMediaBoxData
      | IProfilePostBoxData,
  ) => {
    setNewBoxes(
      newBoxes.map((box, i) => {
        if (i === index) {
          box.data = data;
        }
        return box;
      }),
    );
  };

  const handleBoxCommit = (commitBoxes: ProfileBox[]) => {
    setBoxes(commitBoxes);
    setIsEditing(false);
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
    setNewBoxes([...newBoxes, newBox]);
  };

  const handleDragStart = (
    event: React.DragEvent,
    index: number,
    box: ProfileBox,
  ) => {
    if (!isEditing) return;
    // TEMP FIX (along with dragActive state) for default draggable elements as children of profile boxes.
    if ((event.target as Element).nodeName !== "DIV") return;
    event.stopPropagation();
    setDragActive(true);
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
      setNewBoxes(editedBoxes);
    }, 0);
  };

  const handleDragEnter = (_event: React.DragEvent, index: number) => {
    if (!isEditing) return;
    if (!dragActive) return;
    setDragOverIndex(index);
    const editedBoxes = boxes.filter((box) => box.type !== "placeholder");
    editedBoxes.splice(index, 0, {
      type: "placeholder",
      data: {},
    });
    setNewBoxes(editedBoxes);
  };

  const handleDragEnd = () => {
    if (!isEditing || !dragActive) return;
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
    setNewBoxes(editedBoxes);
    setDragOverIndex(null);
    setDraggedBox(null);
    setDraggedHeight(0);
    setDragActive(false);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-4">
        {isEditing ? (
          <h3 className="my-[1.31rem] text-center">
            Editing {user.user?.screenName}'s Profile
          </h3>
        ) : (
          <h2 className="my-4 text-center">
            {user.user?.screenName}'s Profile
          </h2>
        )}
        {owned && !isEditing && (
          <Button onClick={() => setIsEditing(true)} className="btn-primary">
            Edit
          </Button>
        )}
        {isEditing && (
          <>
            <Button
              onClick={() => setIsEditing(false)}
              className="btn-secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleBoxCommit(newBoxes)}
              className="btn-primary"
            >
              Confirm Edits
            </Button>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {newBoxes.map((box, i) => {
          switch (box.type) {
            case "text":
              return (
                <div
                  key={i}
                  draggable={isEditing}
                  onDragStart={(e) => handleDragStart(e, i, box)}
                  className="relative h-fit"
                  onDragEnter={(e) => handleDragEnter(e, i)}
                  onDragEnd={() => handleDragEnd()}
                >
                  <ProfileTextBox
                    title={box.data.title}
                    text={box.data.text}
                    editing={isEditing || false}
                    index={i}
                    handleDataChange={handleBoxDataChange}
                  />
                </div>
              );
            case "links":
              return (
                <div
                  key={i}
                  draggable={isEditing}
                  onDragStart={(e) => handleDragStart(e, i, box)}
                  className="relative h-fit"
                  onDragEnter={(e) => handleDragEnter(e, i)}
                  onDragEnd={() => handleDragEnd()}
                >
                  <ProfileLinkBox
                    links={box.data.links}
                    editing={isEditing || false}
                    index={i}
                    handleDataChange={handleBoxDataChange}
                  />
                </div>
              );
            case "media":
              return (
                <div
                  key={i}
                  draggable={isEditing}
                  onDragStart={(e) => handleDragStart(e, i, box)}
                  className="relative h-fit"
                  onDragEnter={(e) => handleDragEnter(e, i)}
                  onDragEnd={() => handleDragEnd()}
                >
                  <ProfileMediaBox
                    media={box.data.media}
                    newHeight={box.data.newHeight}
                    editing={isEditing || false}
                    index={i}
                    handleDataChange={handleBoxDataChange}
                  />
                </div>
              );
            case "post":
              return (
                <div
                  key={i}
                  draggable={isEditing}
                  onDragStart={(e) => handleDragStart(e, i, box)}
                  className="relative h-fit"
                  onDragEnter={(e) => handleDragEnter(e, i)}
                  onDragEnd={() => handleDragEnd()}
                >
                  <ProfilePostBox
                    post={box.data.post}
                    editing={isEditing || false}
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
        {isEditing && (
          <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-xl border border-black50 p-4">
            <DropdownInput
              items={newBoxDisplayTypes}
              class="min-w-[9rem]"
              onChange={(_val, i) => setCurrentNewType(newBoxTypes[i])}
            />
            <Button
              className="btn-primary"
              onClick={() => handleAddBox(currentNewType as ProfileBox["type"])}
            >
              <span className="font-bold">+ </span>Add new
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileBoxes;
