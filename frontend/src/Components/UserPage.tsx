import { createContext } from "react";
import UserProfileBanner from "./Elements/ProfileElements/UserProfileBanner";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import UserProfile from "./UserProfile";
import UserPosts from "./UserPosts";
import UserMedia from "./UserMedia";
import UserLikes from "./UserLikes";
import { useQuery } from "@tanstack/react-query";
import userService from "../Services/userService";

export const ownerContext = createContext<UserDetails | null>(null);

function UserPage() {
  const userName = useParams().username;

  const ownerQuery = useQuery({
    queryKey: ["profileOwner", userName],
    queryFn: async () => {
      const result = await userService.getUserDetails(userName || "");
      if (!result) throw new Error("Could not find user");
      return result;
    },
  });

  if (ownerQuery.isLoading) {
    return (
      <div className="h-80 w-full animate-pulse bg-black25 dark:bg-black50 sm:h-60"></div>
    );
  }

  if (ownerQuery.isError || !ownerQuery.data) {
    return (
      <div>
        <div className="my-5 text-center text-warning">
          <h5>Error</h5>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ownerContext.Provider value={ownerQuery.data}>
        <UserProfileBanner bannerImage="https://images.pexels.com/photos/38326/pexels-photo-38326.jpeg" />
        <Routes>
          <Route index element={<Navigate to={"profile"} />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="posts" element={<UserPosts />} />
          <Route path="media" element={<UserMedia />} />
          <Route path="likes" element={<UserLikes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ownerContext.Provider>
    </div>
  );
}

export default UserPage;
