import { createContext } from "react";
import UserProfileBanner from "./Elements/UserProfileBanner";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import UserProfile from "./UserProfile";
import UserPosts from "./UserPosts";
import UserMedia from "./UserMedia";
import UserLikes from "./UserLikes";

interface UserWithExtras extends User {
  featuredPost?: Post;
}

export const UserContext = createContext<UserWithExtras>({
  userName: "",
  screenName: "",
  profileImage: "",
  location: "",
  email: "",
  joinDate: new Date(),
  birthDate: new Date(),
  followers: 0,
  following: 0,
  featuredPost: {
    profileName: "",
    postOwner: "",
    text: "",
    media: [],
    reactions: 0,
    tags: [],
    time: new Date(),
  },
});

const mockUserData: UserWithExtras = {
  userName: "@theblogger",
  screenName: "Avid Microblogger",
  profileImage: "",
  location: "Finland",
  email: "theblogger@email.com",
  joinDate: new Date(),
  birthDate: new Date(),
  followers: 6513,
  following: 134,
  featuredPost: {
    profileName: "Avid Microblogger",
    postOwner: "@theblogger",
    text: "This is my very special post that tells a lot about me...",
    media: [
      {
        id: "asdf",
        type: "img",
        source:
          "https://images.pexels.com/photos/1174108/pexels-photo-1174108.jpeg",
      },
    ],
    reactions: 17,
    tags: ["FirstPost", "Hello", "World", "Blogging"],
    time: new Date(),
  },
};

function UserPage() {
  return (
    <UserContext.Provider value={mockUserData}>
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
    </UserContext.Provider>
  );
}

export default UserPage;
