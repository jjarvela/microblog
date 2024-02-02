import { FormEvent, useRef, useState } from "react";
import Button from "../Button";
import TagInput from "../Inputs/TagInput";
import TextAreaInput from "../Inputs/TextAreaInput";
import MaterialSymbolsAddPhotoAlternateOutlineRounded from "../../Icons/MaterialSymbolsAddPhotoAlternateOutlineRounded";
import TextInput from "../Inputs/TextInput";
import UserProfileInfo from "../UserProfileInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postService from "../../../Services/postService";
import { testUserId } from "../../../globalData";
import axios from "axios";

type NewPostProps = {
  user: User;
  id?: number;
  text: string;
  tags: string[];
  refObject: React.MutableRefObject<HTMLDialogElement | null>;
  mode: "post" | "edit";
};

function PostModal({ user, id, text, tags, refObject, mode }: NewPostProps) {
  const queryClient = useQueryClient();
  const form = useRef<HTMLFormElement>(null);
  const [postText, setPostText] = useState(text);
  const [newTags, setNewTags] = useState<string[]>(tags);
  const [files, setFiles] = useState<File[]>([]);

  const mutateAddPost = useMutation({
    mutationFn: (post: BlogToServer) =>
      postService.addNewPost(post, testUserId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", testUserId] });
    },
  });

  const mutateEditPost = useMutation({
    mutationFn: (post: BlogToServer) =>
      postService.editPost(post, testUserId, id!), // FIX ME: id optional for now because of rewriting
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", testUserId] });
    },
  });

  const handleAddPostSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newPost: BlogToServer = {
      text: postText,
      date: new Date().toISOString(),
      hashtags: newTags,
    };
    mutateAddPost.mutate(newPost);
    refObject.current?.close();
  };

  const handleEditPostSubmit = (e: FormEvent) => {
    e.preventDefault();
    const editedPost: BlogToServer = {
      id: id,
      text: postText,
      date: new Date().toISOString(),
      hashtags: newTags,
    };
    mutateEditPost.mutate(editedPost);
    refObject.current?.close();
  };

  const postFile = useMutation({
    mutationKey: ["post-modal-files"],
    mutationFn: () =>
      axios
        .post(`http://localhost:9000/${testUserId}/${testUserId}`, files, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const isFormValid = form.current?.checkValidity();

    if (!isFormValid) form.current && form.current.reportValidity();
    else {
      e.preventDefault();

      postFile.mutate();
    }
  };

  return (
    <dialog
      ref={refObject}
      className="rounded-xl border border-black50 bg-white p-8 backdrop:bg-[#000] backdrop:opacity-50 dark:border-white50 dark:bg-black dark:text-white"
    >
      <div className="flex flex-col gap-6">
        {mode === "post" ? (
          <div className="flex flex-row items-center justify-center gap-4">
            <h3 className="whitespace-nowrap">Post to</h3>
            <UserProfileInfo user={user} class="mr-4" />
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center">
            <h3 className="whitespace-nowrap">Edit post</h3>
          </div>
        )}
        <form
          ref={form}
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            mode === "post"
              ? handleAddPostSubmit(e)
              : mode === "edit"
                ? handleEditPostSubmit(e)
                : null;
          }}
        >
          <TextAreaInput
            value={postText}
            placeholder="Post text..."
            showCount
            maxLength={500}
            className="min-h-[20rem] w-full"
            onChange={(e) => setPostText(e.target.value)}
            autofocus={true}
          />
          <label
            htmlFor="post-media"
            className="btn-primary mt-2 flex w-fit flex-row items-center gap-2 px-4"
          >
            <span className="text-lg">
              <MaterialSymbolsAddPhotoAlternateOutlineRounded />
            </span>
            Add media...
          </label>
          <input
            id="post-media"
            name="user-media"
            className="collapse h-0 w-0"
            type="file"
            accept=".jpg, .jpeg, .png, .gif, .svg, .mp4, .mpeg, .avi"
            multiple
            max={4}
            onChange={(e) => {
              if (e.target.files) {
                console.log(e.target.files);
                const files = [];
                for (let i = 0; i < e.target.files.length; i++) {
                  files.push(e.target.files[i]);
                }
                console.log(files);
                setFiles(files);
              }
            }}
          />
          <TagInput
            tags={newTags}
            onTagsChanged={(tag) => setNewTags(tag)}
            maxTagLength={20}
            maxTags={20}
            showCount
            class="w-full max-w-[32rem]"
          />
          <div className="flex flex-row flex-wrap gap-4">
            <h5 className="ml-2">Add to group</h5>
            <TextInput
              className="w-full min-w-fit flex-1"
              placeholder="Group name..."
            />
          </div>
          <div className="mt-2 flex flex-row justify-between">
            <Button
              className="btn-secondary"
              onClick={() => refObject.current?.close()}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="btn-primary"
              onClick={(e) => {
                handleSubmit(e);
                refObject.current?.close();
              }}
            >
              {mode === "post" && "Post"}
              {mode === "edit" && "Edit"}
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default PostModal;
