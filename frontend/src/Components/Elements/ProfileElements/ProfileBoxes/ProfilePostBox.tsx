import { useEffect, useRef, useState } from "react";
import TagList from "../../PostElements/TagList";
import UserProfileInfo from "../../UserProfileInfo";
import ProfileBoxModificationButtons from "./ProfileBoxModificationButtons";
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
  handleDelete,
}: ProfilePostBoxProps) {
  const [modifying, setModifying] = useState(false);
  const handleEndEdit = () => {
    if (modifying && index !== undefined && handleDataChange) {
      handleDataChange(index, { post: editedPost });
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

  const [editedPost] = useState(post);

  return (
    <div ref={divRef} className="rounded-xl border border-black50">
      <div className="p-4">
        {editing && modifying ? (
          <div className="flex flex-col flex-wrap gap-4">
            <TextInput placeholder="Enter post id..." />
            <Button className="btn-primary">Apply</Button>
            <p className="text-sm italic opacity-50">Not implemented yet...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <UserProfileInfo user={post.postOwner} />
            <p>{post.text}</p>
            <TagList tags={post.tags} />
          </div>
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

export default ProfilePostBox;
