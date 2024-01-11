import { createContext } from "react";
import UserProfileBanner from "./Elements/UserProfileBanner";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";

interface UserWithFollows extends User {
  followers: number;
  following: number;
}

export const UserContext = createContext<UserWithFollows>({
  userName: "",
  screenName: "",
  profileImage: "",
  location: "",
  email: "",
  joinDate: new Date(),
  birthDate: new Date(),
  followers: 0,
  following: 0,
});

const mockUserData: UserWithFollows = {
  userName: "@theblogger",
  screenName: "Avid Microblogger",
  profileImage: "",
  location: "Finland",
  email: "theblogger@email.com",
  joinDate: new Date(),
  birthDate: new Date(),
  followers: 6513,
  following: 134,
};

function UserPage() {
  return (
    <UserContext.Provider value={mockUserData}>
      <div>
        <UserProfileBanner bannerImage="https://images.pexels.com/photos/38326/pexels-photo-38326.jpeg" />
        <Routes>
          <Route index element={<Navigate to={"profile"} />} />
          <Route path="profile" element={<h1>Profile</h1>} />
          <Route path="posts" element={<h1>Posts</h1>} />
          <Route path="media" element={<h1>Media</h1>} />
          <Route path="likes" element={<h1>Likes</h1>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default UserPage;
