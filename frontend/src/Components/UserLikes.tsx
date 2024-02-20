import Post from "./Elements/PostElements/Post";
import { useQuery } from "@tanstack/react-query";
import { ProfileContext } from "./UserPage";
import { useContext } from "react";
import postService from "../Services/postService";

function UserLikes() {
  const profile = useContext(ProfileContext);

  const userLikeQuery = useQuery({
    queryKey: ["likes", profile.details?.userName],
    queryFn: () => {
      return postService.getUserReactions(profile.details?.id || "", ["like"]);
    },
    enabled: !!profile.details,
  });

  return (
    <div className="my-4">
      <h2 className="my-4 text-center">
        {profile.details?.screenName}'s Likes
      </h2>
      {userLikeQuery.data &&
        (userLikeQuery.data as BlogPostFromServer[]).map((post) => (
          <Post
            post={post}
            topInfo={profile.details?.userName + " liked this"}
          />
        ))}
    </div>
  );
}

export default UserLikes;
