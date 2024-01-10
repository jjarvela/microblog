import { createContext } from "react";
import UserProfileBanner from "./Elements/UserProfileBanner";

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

function UserProfile() {
  return (
    <UserContext.Provider value={mockUserData}>
      <div>
        <UserProfileBanner bannerImage="https://images.pexels.com/photos/38326/pexels-photo-38326.jpeg" />
      </div>
    </UserContext.Provider>
  );
}

export default UserProfile;
