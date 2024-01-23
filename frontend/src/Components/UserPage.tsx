import { createContext, useContext } from "react";
import UserProfileBanner from "./Elements/ProfileElements/UserProfileBanner";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import UserProfile from "./UserProfile";
import UserPosts from "./UserPosts";
import UserMedia from "./UserMedia";
import UserLikes from "./UserLikes";
import { UserContext as UserWrapperContext } from "../UserWrapper";
import UserProfileEdit from "./UserProfileEdit";
import { ProfileBox } from "./Elements/ProfileElements/ProfileBoxes/ProfileBoxes";

interface UserWithExtras extends User {
  featuredPost?: Post;
  userProfileBoxes: ProfileBox[];
}

export const UserProfileContext = createContext<UserWithExtras>({
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
    postOwner: { userName: "", screenName: "", followers: 0, following: 0 },
    text: "",
    media: [],
    reactions: 0,
    tags: [],
    time: new Date(),
  },
  userProfileBoxes: [],
});

const mockUser: User = {
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
    postOwner: mockUser,
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
  userProfileBoxes: [
    {
      type: "text",
      data: { title: "Hello World", text: "Lorem ipsum dolor sit amet!" },
    },
    {
      type: "links",
      data: { links: [{ icon: "T", text: "Twitter" }] },
    },
    {
      type: "media",
      data: {
        media: {
          id: "032589",
          source:
            "https://images.pexels.com/photos/1174108/pexels-photo-1174108.jpeg",
          type: "img",
        },
      },
    },
    {
      type: "post",
      data: {
        post: {
          text: "Hello world again! It's me, a computer program. I am forced to say these things because of these meddlesome programmers...",
          media: [],
          postOwner: mockUser,
          reactions: 0,
          tags: ["tags", "go", "here"],
          time: new Date(),
        },
      },
    },
  ],
};

function UserPage() {
  const user = useContext(UserWrapperContext);
  return (
    <UserProfileContext.Provider
      value={{ ...mockUserData, ...user?.user } || mockUserData}
    >
      <div>
        <UserProfileBanner bannerImage="https://images.pexels.com/photos/38326/pexels-photo-38326.jpeg" />
        <Routes>
          <Route index element={<Navigate to={"profile"} />} />
          <Route path="profile" element={<UserProfile />} />
          {/* TODO: Secure the edit route to only logged in profiles. */}
          <Route path="profile/edit" element={<UserProfileEdit />} />
          <Route path="posts" element={<UserPosts />} />
          <Route path="media" element={<UserMedia />} />
          <Route path="likes" element={<UserLikes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </UserProfileContext.Provider>
  );
}

export default UserPage;
