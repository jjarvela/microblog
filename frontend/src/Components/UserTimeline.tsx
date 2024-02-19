import { Routes, Route, Navigate, useParams } from "react-router";
// import FollowedGroups from "./Elements/FollowedGroups";
import FollowedHashtags from "./Elements/FollowedHashtags";
import FollowedUsers from "./Elements/FollowedUsers";
import Post from "./Elements/PostElements/Post";
import TopPageNav from "./Elements/TopPageNav";
import MaterialSymbolsPersonCheck from "./Icons/MaterialSymbolsPersonCheck";
import IonRibbonB from "./Icons/IonRibbonB";
import MaterialSymbolsTagRounded from "./Icons/MaterialSymbolsTagRounded";
import { useUser } from "../UserWrapper";
import { useQueries, useQuery } from "@tanstack/react-query";
import postService from "../Services/postService";
import userService from "../Services/userService";

const UserTimeline = () => {
  const user = useUser().user;

  const page = useParams()["*"];

  const followingQuery = useQuery({
    queryKey: ["following"],
    queryFn: () => userService.getUserFollowing(user?.id || ""),
    enabled: !!user?.id,
  });

  const followedPostsQueries = useQueries({
    queries: followingQuery.data
      ? followingQuery.data.map((follow: UserFollowing) => {
          return {
            queryKey: ["posts", follow.follows_user],
            queryFn: () => postService.getPosts(follow.follows_user),
            enabled: !!followingQuery.data,
          };
        })
      : [],
  });

  if (followedPostsQueries.find((query) => query.isLoading)) {
    return <></>;
  }

  return (
    <>
      <div className="flex basis-4/12 justify-center">
        <TopPageNav
          destination="following"
          linkName="Following"
          icon={MaterialSymbolsPersonCheck}
        />
        <TopPageNav
          destination="originals"
          linkName="Originals"
          icon={IonRibbonB}
        />
        <TopPageNav
          destination="mytags"
          linkName="My Tags"
          icon={MaterialSymbolsTagRounded}
        />
      </div>
      <h2 className="my-4 text-center">Timeline</h2>
      <div className="flex flex-col gap-4">
        <>
          {followedPostsQueries.find((query) => query.isLoading) && (
            <h4>Loading posts...</h4>
          )}
          {followedPostsQueries.map((query) => {
            if (query.data)
              return (query.data as BlogPostFromServer[])
                .filter((post) => {
                  if (page === "originals" && post.original_post_id)
                    return false;
                  else return true;
                })
                .map((post) => (
                  <Post
                    key={(post as BlogPostFromServer).id}
                    post={post as BlogPostFromServer}
                  />
                ));
          })}
        </>
      </div>
      <div className="scrollbar-thin overflow-y-auto">
        <Routes>
          <Route index element={<Navigate to={"following"} />} />
          <Route path="people" element={<FollowedUsers />} />
          {/* <Route path="groups" element={<FollowedGroups />} /> */}
          <Route path="hashtags" element={<FollowedHashtags />} />
        </Routes>
      </div>
    </>
  );
};

export default UserTimeline;
