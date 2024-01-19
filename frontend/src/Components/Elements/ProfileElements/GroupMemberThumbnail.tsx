import { ProfilePicture } from "../ProfilePicture";

type GroupMemberThumbnailProps = {
  profileName: string;
};

export default function GroupMemberThumbnail({
  profileName,
}: GroupMemberThumbnailProps) {
  return (
    <div className="m-3 flex flex-col items-center gap-2">
      <ProfilePicture width={50} />
      <p className="">{profileName}</p>
    </div>
  );
}
