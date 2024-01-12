import { ProfilePicture } from "./ProfilePicture";

type UserProfileInfoProps = {
  profileImage?: string;
  profileName: string;
  profileHandle: string;
  profileImageSize?: number;
  class?: string;
  nameClass?: string;
  handleClass?: string;
};

function UserProfileInfo({
  profileImage,
  profileName,
  profileHandle,
  profileImageSize,
  class: classAdd,
  nameClass,
  handleClass,
}: UserProfileInfoProps) {
  return (
    <div
      className={
        "mr-auto flex flex-row flex-wrap items-center gap-4" + " " + classAdd
      }
    >
      <div className="mx-auto">
        <ProfilePicture
          width={profileImageSize ? profileImageSize : 80}
          image={profileImage}
        />
      </div>
      <div className={"mx-auto flex flex-col"}>
        <h5 className={nameClass}>{profileName}</h5>
        <p className={"text-black50" + " " + handleClass}>{profileHandle}</p>
      </div>
    </div>
  );
}

export default UserProfileInfo;
