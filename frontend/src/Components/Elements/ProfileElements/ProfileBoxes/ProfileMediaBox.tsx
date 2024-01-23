export type ProfileMediaBoxProps = {
  media: Media;
};

function ProfileMediaBox({ media }: ProfileMediaBoxProps) {
  return (
    <div className="rounded-xl border border-black50 p-2">
      <img src={media.source} />
    </div>
  );
}

export default ProfileMediaBox;
