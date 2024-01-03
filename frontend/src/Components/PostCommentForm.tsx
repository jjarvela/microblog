import { ProfilePicture } from "./Elements/ProfilePicture";
import Button from "./Elements/Button";
import TextAreaInput from "./Elements/TextAreaInput";
import TagInput from "./Elements/TagInput";
import MaterialSymbolsAddPhotoAlternateOutlineRounded from "./Icons/MaterialSymbolsAddPhotoAlternateOutlineRounded";

type PostCommentFormProps = {
  profileName: string;
  profileImage?: string;
  username: string;
  text: string;
};

function PostCommentForm(props: PostCommentFormProps) {
  return (
    <div className="timeline-box mt-4 flex flex-col">
      <div className="mb-4 flex flex-row items-center gap-4">
        <ProfilePicture width={80} image={props.profileImage} />
        <h5>Commenting as</h5>
        <p className="text-black50">{props.username}</p>
      </div>
      <form className="flex flex-col gap-4">
        <TextAreaInput
          text={props.text}
          placeholder="Post text..."
          showCount
          maxLength={500}
        />
        <Button
          type="button"
          class="btn-primary flex w-fit flex-row items-center gap-2 px-4"
        >
          <span className="text-lg">
            <MaterialSymbolsAddPhotoAlternateOutlineRounded />
          </span>
          Add media...
        </Button>

        <div className="mt-2 flex">
          <TagInput
            tags={[]}
            onTagsChanged={function (tags: string[]): void {
              throw new Error("Function not implemented.");
            }}
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
