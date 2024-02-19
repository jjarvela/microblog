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
import profileService from "../Services/profileService";

interface IProfileContext {
  profile: UserProfile | null;
  user: User | null;
  details: UserDetails | null;
}

export const ProfileContext = createContext<IProfileContext>({
  profile: null,
  user: null,
  details: null,
});

function UserPage() {
  const { username } = useParams();

  const details = useQuery({
    queryKey: ["details", username],
    queryFn: () => userService.getUserDetails(username || ""),
  });

  const profile = useQuery({
    queryKey: ["profile", username],
    queryFn: () => profileService.getUserProfile(details.data.id),
    enabled: details.isSuccess,
  });

  const user = useQuery({
    queryKey: ["user", username],
    queryFn: () => userService.getUser(details.data.id),
    enabled: details.isSuccess,
  });

  if (details.isLoading || profile.isLoading || user.isLoading) {
    return (
      <div className="flex h-60 w-full animate-pulse items-center justify-center bg-black25 dark:bg-black75 sm:h-60">
        <h3 className="w-full text-center">Loading profile...</h3>
      </div>
    );
  }

  if (details.data && user.data && profile.data)
    return (
      <ProfileContext.Provider
        value={{
          profile: profile.data,
          user: user.data,
          details: details.data,
        }}
      >
        <div>
          <UserProfileBanner bannerImage="https://images.pexels.com/photos/38326/pexels-photo-38326.jpeg" />
          <Routes>
            <Route index element={<Navigate to={"profile"} />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="posts" element={<UserPosts />} />
            <Route path="media" element={<UserMedia />} />
            <Route path="likes" element={<UserLikes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </ProfileContext.Provider>
    );
  return <NotFound />;
}

export default UserPage;
