import { Link } from "react-router-dom";
import { ProfilePicture } from "./ProfilePicture";
import { useState } from "react";
import Button from "./Button";
import { useUser } from "../../UserWrapper";

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
  const self = useUser().user;
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className={"relative z-[90] mr-auto" + " " + classAdd}>
      <Link
        to={"/user/" + user.userName}
        className="flex flex-row flex-wrap items-center gap-4"
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
          <h5
            className={`${nameClass} ${
              showPopup ? "underline underline-offset-2" : ""
            }`}
            onMouseEnter={() => {
              setShowPopup(true);
            }}
          >
            {user.screenName}
          </h5>
          <p className={"text-black50" + " " + handleClass}>{user.userName}</p>
        </div>
      </Link>

      <div
        id={user.userName + "popup"}
        className={`${
          !showPopup ? "h-0 w-0" : "h-[max-content] w-[max-content]"
        } absolute left-4 top-0 overflow-hidden `}
        onMouseLeave={() => setShowPopup(false)}
      >
        <div className="mt-[3rem] rounded-xl border border-black50 bg-white dark:border-white50 dark:bg-black dark:text-white">
          <div className="flex flex-col gap-2 p-4">
            <div className="flex flex-row justify-between">
              <ProfilePicture image={user.profileImage} width={60} />
              {self?.userName !== user.userName && (
                <Button className="btn-primary">
                  <p>Follow</p>
                </Button>
              )}
            </div>
            <Link to={"/user/" + user.userName} className="flex flex-col">
              <h5 className="hover:underline hover:underline-offset-2 ">
                {user.screenName}
              </h5>
              <small>{user.userName}</small>
            </Link>
            <p>Fetch user about at some point</p>
            <div className="flex flex-row gap-2 text-lg text-secondary">
              <p>Followers</p>
              <p>Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileInfo;
