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
import FormMediaPreview from "../Inputs/FormMediaPreview";

type NewPostProps = {
  user: UserDetails;
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

  const fileInput = useRef<HTMLInputElement>(null);
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

  const mutateSendMedia = useMutation({
    mutationKey: ["post-modal-files"],
    mutationFn: () => {
      const formData = new FormData();
      files.forEach((file) => formData.append(file.name, file));
      return postService.sendPostMedia(testUserId, testUserId, formData);
    },
  });

  const handleSubmit = (e: FormEvent, mode: NewPostProps["mode"]) => {
    e.preventDefault();
    if (mode === "post") {
      const newPost: BlogToServer = {
        text: postText,
        date: new Date().toISOString(),
        hashtags: newTags,
      };
      mutateAddPost.mutate(newPost);
    } else if (mode === "edit") {
      const editedPost: BlogToServer = {
        id: id,
        text: postText,
        date: new Date().toISOString(),
        hashtags: newTags,
      };
      mutateEditPost.mutate(editedPost);
    }
    if (files.length > 0) {
      mutateSendMedia.mutate();
    }
    setFiles([]);
    form.current?.reset();
    refObject.current?.close();
  };

  const handleDelete = (file: File) => {
    const deleteIndex = files.indexOf(file);
    const newFiles: File[] = files.filter(
      (_file, index) => index !== deleteIndex,
    );
    setFiles(newFiles);
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
          onSubmit={(e) => handleSubmit(e, mode)}
        >
          <TextAreaInput
            value={postText}
            placeholder="Post text..."
            showCount
            maxLength={500}
            className="min-h-[20rem] w-full"
            onChange={(e) => setPostText(e.target.value)}
            autofocus={true}
            // Put text cursor at the end on autofocus.
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length,
              )
            }
          />
          <div className="flex flex-col gap-2">
            <label
              htmlFor="post-media"
              className="btn-primary flex w-fit cursor-pointer flex-row items-center gap-2 px-4"
            >
              <span className="text-lg">
                <MaterialSymbolsAddPhotoAlternateOutlineRounded />
              </span>
              Add media...
            </label>
            <input
              ref={fileInput}
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
                  const newFiles = [];
                  for (let i = 0; i < e.target.files.length; i++) {
                    newFiles.push(e.target.files[i]);
                  }
                  setFiles(newFiles);
                }
              }}
            />

            {files.length > 0 && (
              <div className="flex flex-row gap-1">
                {files.map((file) => (
                  <FormMediaPreview
                    key={Math.floor(Math.random() * 10000)}
                    file={file}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
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
          <div className="flex flex-row justify-between">
            <Button
              className="btn-secondary"
              onClick={() => {
                setFiles([]);
                form.current?.reset();
                refObject.current?.close();
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button className="btn-primary">
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
