import Post from "./Elements/PostElements/Post";
import { useQuery } from "@tanstack/react-query";
import postService from "../Services/postService";
import { useContext } from "react";
import { ProfileContext } from "./UserPage";

function UserPosts() {
  const profile = useContext(ProfileContext);

  const userPostsQuery = useQuery({
    queryKey: ["posts", profile.details?.id],
    queryFn: () => postService.getUserPosts(profile.details?.id || ""),
  });

  if (userPostsQuery.isLoading) {
    return (
      <div className="my-4">
        <h4 className="my-4 text-center">Loading posts...</h4>
      </div>
    );
  }

  if (userPostsQuery.isError) {
    return (
      <div className="my-4">
        <h4 className="my-4 text-center text-warning dark:text-warningDark">
          Error loading posts!
        </h4>
      </div>
    );
  }

  return (
    <div className="my-4">
      <h2 className="my-4 text-center">
        {profile.details?.screenName}'s Posts
      </h2>
      <div className="flex flex-col gap-4">
        {(userPostsQuery.data as BlogPostFromServer[]).map(
          (post: BlogPostFromServer) => {
            return <Post key={post.id} post={post} />;
          },
        )}
      </div>
    </div>
  );
}

export default UserPosts;
