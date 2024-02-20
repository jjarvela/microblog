import { useQuery } from "@tanstack/react-query";
import FollowButton from "../Inputs/FollowButton";
import { ProfilePicture } from "../ProfilePicture";
import userService from "../../../Services/userService";
import profileService from "../../../Services/profileService";

type UserThumbnailProps = {
  username: string;
};

function UserThumbnail({ username }: UserThumbnailProps) {
  const userQuery = useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      const details = await userService.getUserDetails(username);
      const profile = await profileService.getUserProfile(
        (details as UserDetails).id!,
      );
      return { details, profile };
    },
  });

  if (userQuery.isLoading || !userQuery.data) return <></>;
  if (userQuery.isError) return <></>;

  return (
    <div className="timeline-box">
      <div className="flex justify-start gap-4">
        <ProfilePicture width={80} />
        <div className="flex-grow">
          <div className="flex justify-between">
            <div>
              <div className="flex h-fit flex-grow flex-col justify-start px-3">
                <h5 className="me-3 dark:text-white">
                  {userQuery.data.details &&
                    (userQuery.data?.details as UserDetails).screenName}
                </h5>
                <p className="mb-2 text-black50">
                  @
                  {userQuery.data.details &&
                    (userQuery.data?.details as UserDetails).userName}
                </p>
              </div>
              <div className="flex h-fit flex-grow justify-start px-4">
                <small className="me-3 font-semibold text-secondary">
                  {userQuery.data &&
                    (userQuery.data?.details as UserDetails).followers
                      ?.length}{" "}
                  Followers
                </small>
                <small className="font-semibold text-black50">
                  {userQuery.data.details &&
                    (userQuery.data?.details as UserDetails).following
                      ?.length}{" "}
                  Following
                </small>
              </div>
            </div>
            <div className="flex h-fit flex-col justify-end gap-4 self-center lg:flex-row">
              <FollowButton
                followUserName={
                  userQuery.data.details &&
                  (userQuery.data?.details as UserDetails).userName
                }
              />
            </div>
          </div>
          <div className="mx-4">
            <p className="text-black75 dark:text-white">
              {userQuery.data.profile &&
                (userQuery.data?.profile as UserProfile).profile_text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserThumbnail;
