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
  details: UserDetails | null;
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

const UserContext = createContext<IUserContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext) as IUserContext;
}

function UserWrapper({ children }: UserWrapperProps) {
  const [currentUid, setCurrentUid] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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
      setCurrentUid(uid);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (user: RegisterUser) => {
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
  });

  useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (currentUid) {
        const queryData = await userService.getUser(currentUid);
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
        setCurrentUser(userData);
        return queryData;
      }
    },
    enabled: !!currentUid,
  });

  const handleLogin = (username: string, password: string) => {
    loginMutation.mutate({ username: username, password: password });
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
      birthday: birthday.toISOString().split("T")[0],
    });
  };

  const userDetailsQuery = useQuery({
    queryKey: ["details", currentUid],
    queryFn: () => {
      if (currentUid) return userService.getUserDetails(currentUid);
    },
    enabled: !!currentUid,
  });

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        details: userDetailsQuery.data,
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
