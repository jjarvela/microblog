import { Route, Routes, Navigate } from "react-router";
import TopbarLink from "./Elements/TopbarLink";
import FollowedUsers from "./Elements/FollowedUsers";
import FollowedHashtags from "./Elements/FollowedHashtags";
import FollowedGroups from "./Elements/FollowedGroups";
import NotFound from "./NotFound";
import TextInput from "./Elements/TextInput";
import Button from "./Elements/Button";
import MaterialSymbolsSearchRounded from "./Icons/MaterialSymbolsSearchRounded";

const UserFollowing = () => {
  return (
    <div className="flex flex-col">
      <nav className="flex flex-row">
        <div className="w-1/3">
          <TopbarLink to="people" text="People" />
        </div>
        <div className="w-1/3">
          <TopbarLink to="groups" text="Groups" />
        </div>
        <div className="w-1/3">
          <TopbarLink to="hashtags" text="Hashtags" />
        </div>
      </nav>
      <h2 className="text-center">Search</h2>
      <div className="flex w-full flex-row justify-center gap-2">
        <TextInput />
        <Button class="btn-primary aspect-square text-2xl">
          <MaterialSymbolsSearchRounded />
        </Button>
      </div>
      <div className="content">
        <Routes>
          <Route index element={<Navigate to={"people"} />} />
          <Route path="people" element={<FollowedUsers />} />
          <Route path="groups" element={<FollowedGroups />} />
          <Route path="hashtags" element={<FollowedHashtags />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserFollowing;
