import { useQueries, useQuery } from "@tanstack/react-query";
import UserThumbnail from "./SearchThumbnails/UserThumbnail";
import userService from "../../Services/userService";
import { useUser } from "../../UserWrapper";

export default function FollowedUsers() {
  const user = useUser();

  const followedQuery = useQuery({
    queryKey: ["following"],
    queryFn: () => userService.getUserFollowing(user.user?.id || ""),
    enabled: !!user.user?.id,
  });

  const userDetailsQueries = useQueries({
    queries: followedQuery.data
      ? (followedQuery.data as UserFollowing[]).map((follow) => {
          return {
            queryKey: ["following", follow.follows_user],
            queryFn: async () =>
              userService.getUserDetails(
                await userService
                  .getUser(follow.follows_user)
                  .then((res) => res.username),
              ),
          };
        })
      : [],
  });

  if (userDetailsQueries.find((query) => query.isLoading)) {
    return <h4 className="my-4 text-center">Loading users...</h4>;
  }

  if (userDetailsQueries.find((query) => query.isError)) {
    return (
      <h4 className="my-4 text-center text-warning dark:text-warningDark">
        Error loading users!
      </h4>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-2">
      {userDetailsQueries.map((query) => (
        <UserThumbnail
          profileName={query.data.screenName}
          username={query.data.userName}
          userDescription={""}
          followers={query.data.followers?.length || 0}
          following={query.data.following?.length || 0}
        />
      ))}
    </div>
  );
}
