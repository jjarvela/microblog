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
  | { type: "post"; data: ProfilePostBoxProps };

type ProfileBoxesProps = {
  boxes: ProfileBox[];
  editing?: boolean;
};

const newBoxTypes = ["Text Box", "Links Box", "Media Box", "Post Box"];

function ProfileBoxes({ boxes, editing }: ProfileBoxesProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {boxes.map((box, i) => {
        switch (box.type) {
          case "text":
            return (
              <ProfileTextBox
                key={i}
                title={box.data.title}
                text={box.data.text}
              />
            );
          case "links":
            return <ProfileLinkBox key={i} links={box.data.links} />;
          case "media":
            return <ProfileMediaBox key={i} media={box.data.media} />;
          case "post":
            return <ProfilePostBox key={i} post={box.data.post} />;
          default:
            break;
        }
      })}
      {editing && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-black50 p-4">
          <Button class="btn-primary">
            <span className="font-bold">+ </span>Add new
          </Button>
          <DropdownInput items={newBoxTypes} class="min-w-[8rem]" />
        </div>
      )}
    </div>
  );
}

export default ProfileBoxes;
