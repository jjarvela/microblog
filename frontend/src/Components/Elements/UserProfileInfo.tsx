import { Link } from "react-router-dom";
import { ProfilePicture } from "./ProfilePicture";

type UserProfileInfoProps = {
  user: User;
  profileImageSize?: number;
  class?: string;
  nameClass?: string;
  handleClass?: string;
};

function UserProfileInfo({
  user,
  profileImageSize,
  class: classAdd,
  nameClass,
  handleClass,
}: UserProfileInfoProps) {
  return (
    <Link
      to={"/user/" + user.userName}
      className={
        "mr-auto flex flex-row flex-wrap items-center gap-4" + " " + classAdd
      }
    >
      <div className="mx-auto">
        {"profileImage" in user ? (
          <ProfilePicture
            width={profileImageSize ? profileImageSize : 80}
            image={user.profileImage}
          />
        ) : (
          <ProfilePicture width={profileImageSize ? profileImageSize : 80} />
        )}
      </div>
      <div className={"mx-auto flex flex-col"}>
        <h5 className={nameClass}>{user.screenName}</h5>
        <p className={"text-black50" + " " + handleClass}>{user.userName}</p>
      </div>
    </Link>
  );
}

export default UserProfileInfo;
