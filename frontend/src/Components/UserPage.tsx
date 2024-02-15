import UserProfileBanner from "./Elements/ProfileElements/UserProfileBanner";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import UserProfile from "./UserProfile";
import UserPosts from "./UserPosts";
import UserMedia from "./UserMedia";
import UserLikes from "./UserLikes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { serverUrl } from "../globalData";
import { createContext } from "react";
import userService from "../Services/userService";

interface IProfileContext {
  userId: string | null;
  profile: UserProfile | null;
  user: User | null;
  details: UserDetails | null;
}

export const ProfileContext = createContext<IProfileContext>({
  userId: null,
  profile: null,
  user: null,
  details: null,
});

function UserPage() {
  const { username } = useParams();

  const userId = useQuery({
    queryKey: ["uid", username],
    queryFn: () =>
      axios.get(`${serverUrl}/user/id/${username}`).then((res) => res.data),
  });

  const profile = useQuery({
    queryKey: ["profile", username],
    queryFn: () =>
      axios
        .get(`${serverUrl}/user/${userId.data}/profile`)
        .then((res) => res.data),
    enabled: userId.isSuccess,
  });

  const user = useQuery({
    queryKey: ["user", userId.data],
    queryFn: () => userService.getUser(userId.data),
    enabled: userId.isSuccess,
  });

  const details = useQuery({
    queryKey: ["details", userId.data],
    queryFn: () => userService.getUserDetails(userId.data),
    enabled: userId.isSuccess,
  });

  if (profile.isLoading) {
    return <h3 className="my-8 w-full text-center">Loading profile...</h3>;
  }

  if (userId.data && profile.data && user.data && details.data)
    return (
      <ProfileContext.Provider
        value={{
          userId: userId.data,
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
