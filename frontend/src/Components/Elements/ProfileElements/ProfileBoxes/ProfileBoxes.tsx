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

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {boxes.map((box, i) => {
        switch (box.type) {
          case "text":
            return (
              <div draggable onDragStart={(e) => handleOnDrag(e, box)}>
                <ProfileTextBox
                  key={i}
                  title={box.data.title}
                  text={box.data.text}
                />
              </div>
            );
          case "links":
            return (
              <div draggable onDragStart={(e) => handleOnDrag(e, box)}>
                <ProfileLinkBox key={i} links={box.data.links} />
              </div>
            );
          case "media":
            return (
              <div draggable onDragStart={(e) => handleOnDrag(e, box)}>
                <ProfileMediaBox key={i} media={box.data.media} />
              </div>
            );
          case "post":
            return (
              <div draggable onDragStart={(e) => handleOnDrag(e, box)}>
                <ProfilePostBox key={i} post={box.data.post} />
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
