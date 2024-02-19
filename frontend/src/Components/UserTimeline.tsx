import { Routes, Route, Navigate } from "react-router";
import FollowedGroups from "./Elements/FollowedGroups";
import FollowedHashtags from "./Elements/FollowedHashtags";
import FollowedUsers from "./Elements/FollowedUsers";
import Post from "./Elements/PostElements/Post";
import TopPageNav from "./Elements/TopPageNav";
import MaterialSymbolsPersonCheck from "./Icons/MaterialSymbolsPersonCheck";
import IonRibbonB from "./Icons/IonRibbonB";
import MaterialSymbolsTagRounded from "./Icons/MaterialSymbolsTagRounded";
import { useUser } from "../UserWrapper";
import { useQuery } from "@tanstack/react-query";
import postService from "../Services/postService";

const UserTimeline = () => {
  const user = useUser().user;

  const postQuery = useQuery({
    queryKey: ["timeline"],
    queryFn: () => {
      if (user) {
        return postService.getPosts(user.id);
      } else {
        return [];
      }
    },
    enabled: !!user,
  });

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
        {postQuery.data &&
          (postQuery.data as BlogPostFromServer[]).map((post) => {
            return <Post key={Math.floor(Math.random() * 1000)} post={post} />;
          })}
      </div>
      <div className="scrollbar-thin overflow-y-auto">
        <Routes>
          <Route index element={<Navigate to={"following"} />} />
          <Route path="people" element={<FollowedUsers />} />
          <Route path="groups" element={<FollowedGroups />} />
          <Route path="hashtags" element={<FollowedHashtags />} />
        </Routes>
      </div>
    </>
  );
};

export default UserTimeline;
