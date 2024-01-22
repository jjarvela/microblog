import MaterialSymbolsPerson from "../Icons/MaterialSymbolsPerson";

type ProfilePictureProps = {
  width: number;
  image?: string;
};

export function ProfilePicture({ width, image }: ProfilePictureProps) {
  return (
    <div
      className={"flex-shrink-0 rounded-full bg-black25 bg-cover"}
      // Using backgroundImage instead of separate <img> to avoid div background color leaking in on the edges.
      style={{ width: width, height: width, backgroundImage: `url(${image})` }}
    >
      {!image && <MaterialSymbolsPerson width={width} height={width} />}
    </div>
  );
}
