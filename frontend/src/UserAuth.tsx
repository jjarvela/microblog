import { createContext, useState } from "react";
import userService from "./Services/userService";

type UserAuthProps = {
  children: React.ReactNode;
};

interface IAuthContext {
  token: string;
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

export const UserAuthContext = createContext<IAuthContext | null>(null);

function UserAuth({ children }: UserAuthProps) {
  const [currentToken, setCurrentToken] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = async (username: string, password: string) => {
    const response = await userService.login(username, password);
    if (response?.token) {
      setCurrentToken(response.token);
    } else {
      console.log("Login error!");
    }
  };

  const handleLogout = () => {
    setCurrentToken("");
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
    if (response?.user && response?.token) {
      setCurrentUser({
        ...tempUser,
        userName: response.user.username,
        screenName: response.user.screenName,
        email: response.user.email,
        location: response.user.location,
        birthDate: response.user.birthday,
      });
      setCurrentToken(response.token);
    } else {
      console.log("Register error!");
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        user: currentUser,
        token: currentToken,
        onLogin: handleLogin,
        onLogout: handleLogout,
        onRegister: handleRegister,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export default UserAuth;
