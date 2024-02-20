import { Link } from "react-router-dom";
import { ProfilePicture } from "./ProfilePicture";
import { useRef, useState } from "react";
import { useUser } from "../../UserWrapper";
import FollowButton from "./Inputs/FollowButton";
import { useQuery } from "@tanstack/react-query";
import userService from "../../Services/userService";
import profileService from "../../Services/profileService";

type UserProfileInfoProps = {
  user: UserDetails | null;
  profileImageSize?: number;
  class?: string;
  nameClass?: string;
  handleClass?: string;
  disablePopup?: boolean;
};

function UserProfileInfo({
  user,
  profileImageSize,
  class: classAdd,
  nameClass,
  handleClass,
  disablePopup,
}: UserProfileInfoProps) {
  const self = useUser().user;
  const [showPopup, setShowPopup] = useState(false);
  const popup = useRef<HTMLDivElement>(null);
  const [floatY, setFloatY] = useState("top-0");
  const [floatX, setFloatX] = useState("left-4");

  const detailQuery = useQuery({
    queryKey: ["details", user?.id],
    queryFn: () => userService.getUserDetails(user?.userName || ""),
    enabled: !!user?.userName,
  });

  const profileQuery = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => profileService.getUserProfile(user?.id || ""),
    enabled: !!user?.id,
  });

  return (
    <div className={"relative z-[90] mr-auto" + " " + classAdd}>
      <Link
        to={"/user/" + user?.userName}
        className="flex flex-row flex-wrap items-center gap-4"
      >
        <div className="mx-auto">
          {user?.profileImage ? (
            <ProfilePicture
              width={profileImageSize ? profileImageSize : 80}
              image={""} // FIX ME! Load the image from media endpoint!
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
              /*Get the window height and current x and y positions of the popup to adjust its offset so it's always fully on screen*/
              if (
                !disablePopup &&
                window.innerHeight - popup.current!.getBoundingClientRect().y <
                  400
              ) {
                setFloatY("bottom-[5rem]");
              } else {
                setFloatY("top-0");
              }
              if (
                !disablePopup &&
                window.innerWidth - popup.current!.getBoundingClientRect().x >
                  400
              ) {
                setFloatX("left-0");
              } else {
                setFloatX("left-4");
              }
              !disablePopup && setShowPopup(true);
            }}
          >
            {user?.screenName}
          </h5>
          <p className={"text-black50" + " " + handleClass}>
            @{user?.userName}
          </p>
        </div>
      </Link>

      {!disablePopup && (
        <div
          ref={popup}
          className={`${
            !showPopup ? "z-[9999] h-0 w-0" : "h-[max-content] w-[max-content]"
          } absolute ${floatX} ${floatY} overflow-hidden `}
          onMouseLeave={() => setShowPopup(false)}
        >
          <div className="mt-[3rem] rounded-xl border border-black50 bg-white dark:border-white50 dark:bg-black dark:text-white">
            <div className="flex flex-col gap-2 p-4">
              <div className="flex flex-row justify-between">
                {/* FIX ME! Load the image from media endpoint! */}
                <ProfilePicture image={""} width={60} />
                {self?.userName !== user?.userName && (
                  <FollowButton followUserName={user?.userName || ""} />
                )}
              </div>
              <Link to={"/user/" + user?.userName} className="flex flex-col">
                <h5 className="hover:underline hover:underline-offset-2 ">
                  {user?.screenName}
                </h5>
                <small>@{user?.userName}</small>
              </Link>
              {detailQuery.data && profileQuery.data && (
                <>
                  <p>
                    {(profileQuery.data as UserProfile).profile_text.substring(
                      0,
                      20,
                    )}
                    {(profileQuery.data as UserProfile).profile_text.length >
                      20 && "..."}
                  </p>
                  {/*Add proper follower counts once we get them*/}
                  <div className="bold flex flex-row gap-2 text-lg text-secondary">
                    <p>
                      {(detailQuery.data as UserDetails).followers?.length}{" "}
                      Followers
                    </p>
                    <p>
                      {(detailQuery.data as UserDetails).following?.length}{" "}
                      Following
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfileInfo;
