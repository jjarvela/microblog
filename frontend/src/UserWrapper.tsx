import { createContext, useState } from "react";
import userService from "./Services/userService";

type UserWrapperProps = {
  children: React.ReactNode;
};

interface IUserContext {
  user: User | null;
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
  onRegister: (
    username: string,
    password: string,
    screenName: string,
    email: string,
    location: string,
    birthday: Date,
  ) => void;
}

const tempUser: User = {
  userName: "@dickerson99",
  screenName: "Dickerson",
  followers: 420,
  following: 666,
  birthDate: new Date(1999, 0, 1),
  email: "dickerson99@webmail.com",
  joinDate: new Date(2023, 11, 16),
  location: "Finland",
  profileImage: "/temp/pfp.jpg",
};

export const UserContext = createContext<IUserContext | null>(null);

function UserWrapper({ children }: UserWrapperProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(tempUser);

  const handleLogin = async (username: string, password: string) => {
    const response = await userService.login(username, password);
    setCurrentUser({ ...tempUser, userName: username });
    console.log(response);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleRegister = async (
    username: string,
    password: string,
    screenName: string,
    email: string,
    location: string,
    birthday: Date,
  ) => {
    const response = await userService.register(
      username,
      password,
      screenName,
      email,
      location,
      birthday,
    );
    if (response?.user) {
      setCurrentUser({
        ...tempUser,
        userName: response.user.username,
        screenName: response.user.screenName,
        email: response.user.email,
        location: response.user.location,
        birthDate: response.user.birthday,
      });
    } else {
      console.log("Register error!");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        onLogin: handleLogin,
        onLogout: handleLogout,
        onRegister: handleRegister,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserWrapper;
