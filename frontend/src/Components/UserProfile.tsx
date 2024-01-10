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
  userName: "Avid Microblogger",
  screenName: "@theblogger",
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
      <UserProfileBanner />
    </UserContext.Provider>
  );
}

export default UserProfile;
