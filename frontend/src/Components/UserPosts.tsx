import { useContext } from "react";
import { UserProfileContext } from "./UserPage";
import Post from "./Elements/PostElements/Post";
import { useQuery } from "@tanstack/react-query";
import { testUserId } from "../globalData";
import postService from "../Services/postService";

function UserPosts() {
  const user = useContext(UserProfileContext);
  const userPosts = useQuery({
    queryKey: ["posts", testUserId],
    queryFn: () => postService.getUserPosts(testUserId),
  });

  if (userPosts.isLoading) {
    return (
      <div className="my-4">
        <h4 className="my-4 text-center">Loading posts...</h4>
      </div>
    );
  }

  if (userPosts.isError) {
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
      <h2 className="my-4 text-center">{user.screenName}'s Posts</h2>
      <div className="flex flex-col gap-4">
        {(userPosts.data as ServerBlog[]).map((post: ServerBlog) => {
          return (
            <Post
              key={post.id + Math.floor(Math.random() * 10000)}
              post={{
                text: post.blog_text,
                postOwner: user,
                reactions: 0,
                media: [],
                tags: post.item_properties.map((item) => item.value),
                time: new Date(post.timestamp),
              }}
            />
          );
        })}

        {user.featuredPost && <Post post={user.featuredPost} />}
      </div>
    </div>
  );
}

export default UserPosts;
