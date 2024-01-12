import { Route, Routes, Navigate } from "react-router";
import { NavLink } from "react-router-dom";
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
      <nav className="flex flex-row justify-center gap-0 border-b-[1px] border-primary">
        <NavLink
          to="people"
          // The aria-[current=page] selector is standing in for the active class feature of NavLink.
          className="
                aria-[current=page]:bg-primary-gradient
                w-[15%]
                min-w-max
                border-x-[1px] 
               border-black50 
               p-2
               text-center
               text-black75
              hover:bg-black25
              aria-[current=page]:text-white 
              dark:text-white
              dark:hover:bg-black75
              dark:aria-[current=page]:text-black
              "
        >
          <h5>People</h5>
        </NavLink>
        <NavLink
          to="groups"
          // The aria-[current=page] selector is standing in for the active class feature of NavLink.
          className="
                aria-[current=page]:bg-primary-gradient
                w-[15%]
                min-w-max
                border-x-[1px] 
               border-black50 
               p-2
               text-center
               text-black75
              hover:bg-black25
              aria-[current=page]:text-white 
              dark:text-white
              dark:hover:bg-black75
              dark:aria-[current=page]:text-black
              "
        >
          <h5>Groups</h5>
        </NavLink>
        <NavLink
          to="hashtags"
          // The aria-[current=page] selector is standing in for the active class feature of NavLink.
          className="
                aria-[current=page]:bg-primary-gradient
                w-[15%]
                min-w-max
                border-x-[1px] 
               border-black50 
               p-2
               text-center
               text-black75
              hover:bg-black25
              aria-[current=page]:text-white 
              dark:text-white
              dark:hover:bg-black75
              dark:aria-[current=page]:text-black
              "
        >
          <h5>Hashtags</h5>
        </NavLink>
      </nav>
      <label htmlFor="search">
        <h4 className="text-center">Search</h4>
      </label>
      <div className="flex w-full flex-row justify-center gap-2">
        <TextInput id="search" class="max-h-min" />
        <Button class="btn-primary px-2 text-lg">
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
