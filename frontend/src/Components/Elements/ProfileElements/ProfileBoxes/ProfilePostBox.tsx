import TagList from "../../PostElements/TagList";
import UserProfileInfo from "../../UserProfileInfo";

export type ProfilePostBoxProps = {
  post: Post;
};

function ProfilePostBox({ post }: ProfilePostBoxProps) {
  return (
    <div
      draggable
      className="break-inside-avoid-column rounded-xl border border-black50 p-4"
    >
      <div className="flex flex-col gap-4">
        <UserProfileInfo user={post.postOwner} />
        <p>{post.text}</p>
        <TagList tags={post.tags} />
      </div>
    </div>
  );
}

export default ProfilePostBox;
