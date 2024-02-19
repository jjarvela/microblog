import { useLocation } from "react-router";
import Button from "./Elements/Button";
import Post from "./Elements/PostElements/Post";
import { useQuery } from "@tanstack/react-query";
import postService from "../Services/postService";

export default function HashtagIndividual() {
  const location = useLocation();
  //extract the tag from the pathname
  const tag = location.pathname.substring(9);

  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return postService.queryPosts();
    },
  });

  return (
    <div className="mx-auto">
      <div className=" mb-4 flex flex-wrap justify-center gap-2">
        <h3 className="text-primary">#{tag}</h3>
        <Button className="btn-primary">Follow</Button>
      </div>
      <div className="flex flex-col gap-4">
        {postQuery.isLoading && (
          <h5 className="mx-auto my-8 w-max animate-pulse text-black50">
            Loading...
          </h5>
        )}
        {postQuery.isError && (
          <h5 className="mx-auto my-8 w-max text-warning">Error</h5>
        )}
        {postQuery.data &&
          (postQuery.data as BlogPostFromServer[]).map((post) => {
            return (
              <Post
                key={
                  Math.floor(Math.random() * 1000) +
                  "-" +
                  Math.floor(Math.random() * 1000)
                }
                post={post}
              />
            );
          })}
      </div>
    </div>
  );
}
