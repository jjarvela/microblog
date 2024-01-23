export type ProfilePostBoxProps = {
  post: Post;
};

function ProfilePostBox({ post }: ProfilePostBoxProps) {
  return (
    <div className="rounded-xl border border-black50 p-2">
      <p>{post.text}</p>
    </div>
  );
}

export default ProfilePostBox;
