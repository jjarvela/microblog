import Post from "./Elements/PostElements/Post";
import { useQuery } from "@tanstack/react-query";
import postService from "../Services/postService";
import { useContext } from "react";
import { ownerContext } from "./UserPage";

function UserPosts() {
  const owner = useContext(ownerContext);

  const userPostsQuery = useQuery({
    queryKey: ["posts", owner!.id!],
    queryFn: () => {
      if (!owner || !owner.id) throw new Error("Error loading posts");
      return postService.getUserPosts(owner.id);
    },
  });

  if (userPostsQuery.isLoading) {
    return (
      <div className="my-4">
        <h4 className="my-4 text-center">Loading posts...</h4>
      </div>
    );
  }

  if (userPostsQuery.isError || !owner) {
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
      <h2 className="my-4 text-center">{owner.screenName}'s Posts</h2>
      <div className="flex flex-col gap-4">
        {(userPostsQuery.data as BlogPostFromServer[]).map(
          (post: BlogPostFromServer) => {
            return (
              <Post
                key={post.id + Math.floor(Math.random() * 10000)}
                post={{
                  id: post.id,
                  text: post.blog_text,
                  postOwner: owner,
                  reactions: 0,
                  media: [],
                  tags: post.item_properties.map((item) => item.value),
                  time: new Date(post.timestamp),
                }}
              />
            );
          },
        )}
      </div>
    </div>
  );
}

export default UserPosts;
