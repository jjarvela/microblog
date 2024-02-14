import Post from "./Elements/PostElements/Post";
import { useQuery } from "@tanstack/react-query";
import { testUserId } from "../globalData";
import postService from "../Services/postService";
import { useUser } from "../UserWrapper";

function UserPosts() {
  const user = useUser().user;
  const userPostsQuery = useQuery({
    queryKey: ["posts", testUserId],
    queryFn: () => postService.getUserPosts(testUserId),
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
      <h2 className="my-4 text-center">{user?.screenName}'s Posts</h2>
      <div className="flex flex-col gap-4">
        {(userPostsQuery.data as BlogFromServer[]).map(
          (post: BlogFromServer) => {
            return (
              <Post
                key={post.id + Math.floor(Math.random() * 10000)}
                post={{
                  id: post.id,
                  text: post.blog_text,
                  postOwner: user || { userName: "", screenName: "" },
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
