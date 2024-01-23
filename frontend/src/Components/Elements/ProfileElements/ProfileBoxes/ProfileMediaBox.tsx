export type ProfileMediaBoxProps = {
  media: Media;
};

function ProfileMediaBox({ media }: ProfileMediaBoxProps) {
  return (
    <div
      draggable
      className="break-inside-avoid-column overflow-hidden rounded-xl border border-black50"
    >
      <img
        src={media.source}
        className="pointer-events-none h-full object-cover"
      />
    </div>
  );
}

export default ProfileMediaBox;
