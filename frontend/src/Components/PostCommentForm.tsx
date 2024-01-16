import { useState } from "react";
import Button from "./Elements/Button";
import TextAreaInput from "./Elements/TextAreaInput";
import TagInput from "./Elements/TagInput";
import MaterialSymbolsAddPhotoAlternateOutlineRounded from "./Icons/MaterialSymbolsAddPhotoAlternateOutlineRounded";
import InReplyTo from "./Elements/InReplyTo";
import UserProfileInfo from "./Elements/UserProfileInfo";

type PostCommentFormProps = {
  recipient: User;
  commenter: User;
  text: string;
  tags: string[];
};

function PostCommentForm({
  recipient,
  commenter,
  text,
  tags,
}: PostCommentFormProps) {
  const [newTags, setNewTags] = useState<string[]>(tags);
  return (
    <div className="timeline-box mt-4 flex flex-col">
      <div className="mb-4 flex flex-row items-center gap-4">
        <h5>Commenting as</h5>
        <UserProfileInfo user={commenter} />
      </div>
      <InReplyTo username={recipient.screenName} />
      <form className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col">
          <TextAreaInput
            text={text}
            placeholder="Post text..."
            showCount
            maxLength={500}
            class="h-40 w-full"
          />
        </div>
        <Button
          type="button"
          class="btn-primary flex w-fit flex-row items-center gap-2 px-4"
        >
          <span className="text-lg">
            <MaterialSymbolsAddPhotoAlternateOutlineRounded />
          </span>
          Add media...
        </Button>

        <div className="mt-2 flex flex-col">
          <TagInput
            tags={newTags}
            onTagsChanged={(tags) => setNewTags(tags)}
            maxTags={20}
            maxTagLength={20}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="submit" class="btn-primary m-3">
            Comment
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostCommentForm;
