type ProfilePictureProps = {
  width: number;
  image?: string;
};

export function ProfilePicture({ width, image }: ProfilePictureProps) {
  return (
    <div
      className={"flex-shrink-0 rounded-full bg-black25"}
      style={{ width: width, height: width }}
    >
      {image && <img src={image} />}
    </div>
  );
}
