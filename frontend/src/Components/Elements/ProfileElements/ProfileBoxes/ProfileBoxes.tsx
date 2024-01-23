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
};

function ProfileBoxes({ boxes }: ProfileBoxesProps) {
  return (
    <div>
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
    </div>
  );
}

export default ProfileBoxes;
