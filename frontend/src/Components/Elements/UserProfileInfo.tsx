import { ProfilePicture } from "./ProfilePicture";

type UserProfileInfoProps = {
  profileImage?: string;
  profileName: string;
  profileHandle: string;
};

function UserProfileInfo({
  profileImage,
  profileName,
  profileHandle,
}: UserProfileInfoProps) {
  return (
    <div className="mr-auto flex flex-row flex-wrap items-center gap-4">
      <div className="mx-auto">
        <ProfilePicture width={80} image={profileImage} />
      </div>
      <div className={"mx-auto flex flex-col"}>
        <h5>{profileName}</h5>
        <p className="text-black50">{profileHandle}</p>
      </div>
    </div>
  );
}

export default UserProfileInfo;
