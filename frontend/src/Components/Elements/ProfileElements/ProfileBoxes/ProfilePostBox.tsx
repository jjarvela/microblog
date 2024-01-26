import { useState } from "react";
import TagList from "../../PostElements/TagList";
import UserProfileInfo from "../../UserProfileInfo";
import ProfileBoxModifyingButton from "./ProfileBoxModifyingButton";
import { IProfileEditableBox } from "./ProfileBoxes";
import TextInput from "../../Inputs/TextInput";
import Button from "../../Button";

type ProfilePostBoxProps = IProfileEditableBox & IProfilePostBoxData;

export interface IProfilePostBoxData {
  post: Post;
}

function ProfilePostBox({
  post,
  editing,
  index,
  handleDataChange,
}: ProfilePostBoxProps) {
  const [modifying, setModifying] = useState(false);
  const handleEndEdit = () => {
    if (modifying && index !== undefined && handleDataChange) {
      handleDataChange(index, { post: editedPost });
    }
    setModifying(!modifying);
  };

  const [editedPost] = useState(post);

  return (
    <div className="rounded-xl border border-black50 p-4">
      {editing && modifying ? (
        <div className="flex flex-col flex-wrap gap-4">
          <TextInput placeholder="Enter post id..." />
          <Button class="btn-primary">Apply</Button>
          <p className="text-sm italic opacity-50">Not implemented yet...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <UserProfileInfo user={post.postOwner} />
          <p>{post.text}</p>
          <TagList tags={post.tags} />
        </div>
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

export default ProfilePostBox;
