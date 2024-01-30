import { Route, Routes, Navigate } from "react-router";
import FollowedUsers from "./Elements/FollowedUsers";
import FollowedHashtags from "./Elements/FollowedHashtags";
import FollowedGroups from "./Elements/FollowedGroups";
import NotFound from "./NotFound";
import TextInput from "./Elements/Inputs/TextInput";
import Button from "./Elements/Button";
import MaterialSymbolsSearchRounded from "./Icons/MaterialSymbolsSearchRounded";
import TopPageNav from "./Elements/TopPageNav";
import MaterialSymbolsPerson from "./Icons/MaterialSymbolsPerson";
import MaterialSymbolsGroupsRounded from "./Icons/MaterialSymbolsGroupsRounded";
import MaterialSymbolsTagRounded from "./Icons/MaterialSymbolsTagRounded";

const UserFollowing = () => {
  return (
    <div className="flex h-full flex-col">
      <nav className="flex flex-row justify-center gap-0 border-b-[1px] border-primary">
        <TopPageNav
          destination="people"
          linkName="People"
          icon={MaterialSymbolsPerson}
        />
        <TopPageNav
          destination="groups"
          linkName="Groups"
          icon={MaterialSymbolsGroupsRounded}
        />
        <TopPageNav
          destination="hashtags"
          linkName="Hashtags"
          icon={MaterialSymbolsTagRounded}
        />
      </nav>
      <label htmlFor="search">
        <h4 className="text-center">Search</h4>
      </label>
      <div className="flex w-full flex-row justify-center gap-2">
        <TextInput id="search" className="max-h-min" />
        <Button class="btn-primary px-2 text-lg">
          <MaterialSymbolsSearchRounded />
        </Button>
      </div>
      <div className="scrollbar-thin overflow-y-auto">
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
