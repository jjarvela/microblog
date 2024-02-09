import { useEffect, useRef, useState } from "react";
import TagList from "../../PostElements/TagList";
import UserProfileInfo from "../../UserProfileInfo";
import ProfileBoxModificationButtons from "./ProfileBoxModificationButtons";
import { IProfileEditableBox } from "./ProfileBoxes";
import TextInput from "../../Inputs/TextInput";
import Button from "../../Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { testUserId } from "../../../../globalData";
import postService from "../../../../Services/postService";

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
  const queryClient = useQueryClient();

  const [modifying, setModifying] = useState(false);
  const handleEndEdit = () => {
    if (modifying && index !== undefined && handleDataChange) {
      handleDataChange(index, { post: editedPost });
    }
    setModifying(!modifying);
    queryClient.invalidateQueries({ queryKey: ["post", testUserId, post.id] });
  };

  const postQuery = useQuery({
    queryKey: ["post", testUserId, post.id],
    queryFn: () => postService.getUserPosts(testUserId, post.id),
  });

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

  const [editedPost, setEditedPost] = useState({ ...post, id: 0 });
  const [editedId, setEditedId] = useState(post.id || 0);

  if (postQuery.isLoading && !modifying) {
    return (
      <div
        ref={divRef}
        className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-black50"
      >
        <h6 className="p-4">Loading post...</h6>
        {editing && (
          <ProfileBoxModificationButtons
            modifying={modifying}
            handleEndEdit={handleEndEdit}
            handleDelete={() => handleDelete(index)}
            class="w-full"
          />
        )}
      </div>
    );
  }

  if ((postQuery.isError && !modifying) || (editedId === 0 && !modifying)) {
    return (
      <div
        ref={divRef}
        className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-black50"
      >
        <h6 className="p-4 text-warning dark:text-warningDark">
          Failed to load post!
        </h6>
        {editing && (
          <ProfileBoxModificationButtons
            modifying={modifying}
            handleEndEdit={handleEndEdit}
            handleDelete={() => handleDelete(index)}
            class="w-full"
          />
        )}
      </div>
    );
  }

  return (
    <div ref={divRef} className="rounded-xl border border-black50">
      <div className="p-4">
        {editing && modifying ? (
          <div className="flex flex-col flex-wrap gap-4">
            <TextInput
              placeholder="Enter post id..."
              value={editedId}
              onChange={(e) => setEditedId(Number(e.target.value))}
            />
            <Button
              className="btn-primary"
              onClick={() => setEditedPost({ ...editedPost, id: editedId })}
            >
              Apply
            </Button>
            <p className="text-sm italic opacity-50">Not implemented yet...</p>
          </div>
        ) : (
          <>
            {" "}
            {postQuery.data && !Array.isArray(postQuery.data) && (
              <div className="flex flex-col gap-4">
                <UserProfileInfo user={post.postOwner} />
                <p>{postQuery.data.blog_text}</p>
                <TagList
                  tags={(postQuery.data as BlogFromServer).item_properties.map(
                    (item) => item.value,
                  )}
                />
              </div>
            )}
          </>
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
