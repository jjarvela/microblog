import { useLocation } from "react-router";
import Button from "./Elements/Button";
import Post from "./Elements/PostElements/Post";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import postService from "../Services/postService";
import { useEffect } from "react";

export default function HashtagIndividual() {
  const location = useLocation();
  //extract the tag from the pathname
  const tag = location.pathname.substring(9);
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("useEffect");
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  }, [tag]);

  const postQuery = useQuery({
    queryKey: ["posts", tag],
    queryFn: () => {
      return postService.queryPosts({ hashtags: [tag] });
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
