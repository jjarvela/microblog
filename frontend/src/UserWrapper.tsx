import { createContext, useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import userService from "./Services/userService";

const baseURL = import.meta.env.VITE_BACKEND_URL;

type UserWrapperProps = {
  children: React.ReactNode;
};

type LoginUser = {
  username: string;
  password: string;
};

interface IUserContext {
  user: User | null;
  setUser: (user: User) => void;
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
  birthday: new Date(1999, 0, 1),
  email: "dickerson99@webmail.com",
  joinDate: new Date(2023, 11, 16),
  location: "Finland",
  profileImage: "/temp/pfp.jpg",
};

const UserContext = createContext<IUserContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext) as IUserContext;
}

function UserWrapper({ children }: UserWrapperProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(tempUser);

  const loginMutation = useMutation({
    mutationFn: (user: LoginUser) => {
      return axios
        .post(`${baseURL}/login`, {
          userId: user.username,
          password: user.password,
        })
        .then((res) => {
          return res.data as string;
        });
    },
    onError: (error) => console.error(error),
    onSuccess: (uid: string) => {
      setCurrentUser({ ...tempUser, id: uid });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (user: User) => {
      return axios
        .post(`${baseURL}/register`, {
          username: user.userName,
          password: user.password,
          screenName: user.screenName,
          email: user.email,
          location: user.location,
          birthday: user.birthday?.toString(),
        })
        .then((res) => {
          return res.data as User;
        });
    },
    onError: (error) => console.error(error),
    onSuccess: (data: User) => {
      setCurrentUser({ ...tempUser, ...data });
    },
  });

  const userQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => {
      if (currentUser?.id) return userService.getUser(currentUser.id);
    },
    enabled: !!currentUser?.id,
  });

  const handleLogin = async (username: string, password: string) => {
    loginMutation.mutate({ username: username, password: password });
    const queryData = await userQuery.data;
    const userData: User = {
      id: queryData.uid,
      userName: queryData.username,
      screenName: queryData.screen_name,
      profileImage: queryData.profile_image,
      email: queryData.email,
      birthday: new Date(queryData.birthday),
      joined: new Date(queryData.joined),
      location: queryData.location,
    };
    setCurrentUser({ ...currentUser, ...userData });
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
    registerMutation.mutate({
      userName: username,
      password: password,
      screenName: screenName,
      email: email,
      location: location,
      birthday: birthday,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        setUser: setCurrentUser,
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
