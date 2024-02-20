import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../Button";
import userService from "../../../Services/userService";
import { useUser } from "../../../UserWrapper";

type FollowButtonProps = {
  followUserName: string;
};

function FollowButton({ followUserName }: FollowButtonProps) {
  const user = useUser();
  const queryClient = useQueryClient();

  const followTargetDetailsQuery = useQuery({
    queryKey: ["details", followUserName],
    queryFn: () => userService.getUserDetails(followUserName),
    enabled: !!followUserName,
  });

  const isFollowingQuery = useQuery({
    queryKey: ["following", user.user?.id],
    queryFn: () => userService.getUserFollowing(user.user?.id || ""),
    enabled: !!user.user?.id,
  });

  const followMutation = useMutation({
    mutationKey: ["following", user.user?.id],
    mutationFn: (follow: boolean) => {
      // follow true/false => follow/unfollow
      if (followTargetDetailsQuery.data) {
        if (follow) {
          return userService.addUserFollowing(
            user.user?.id || "",
            followTargetDetailsQuery.data.id,
          );
        } else {
          return userService.deleteUserFollowing(
            user.user?.id || "",
            isFollowingQuery.data?.find(
              (follow: UserFollowing) =>
                follow.follows_user === followTargetDetailsQuery.data.id,
            )?.id,
          );
        }
      } else return Promise.reject("Missing follow target details!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["following"],
      });
      queryClient.invalidateQueries({
        queryKey: ["details", followUserName],
      });
    },
  });

  return (
    <>
      {isFollowingQuery.data &&
      followTargetDetailsQuery.data &&
      (isFollowingQuery.data as UserFollowing[]).find(
        (follow) => followTargetDetailsQuery.data.id === follow.follows_user,
      ) ? (
        <Button
          className="btn-secondary flex h-12 w-[6.5rem] items-center justify-center"
          onClick={() => followMutation.mutate(false)}
          disabled={followMutation.isPending}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          className="btn-primary flex h-12 w-[6.5rem] items-center justify-center"
          onClick={() => followMutation.mutate(true)}
          disabled={followMutation.isPending}
        >
          Follow
        </Button>
      )}
    </>
  );
}

export default FollowButton;
