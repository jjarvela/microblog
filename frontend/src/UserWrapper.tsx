import { createContext, useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import userService from "./Services/userService";
import { socket } from "./globalData";

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
  socketId: string;
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
  loginStatus: "idle" | "loading" | "success" | "fail";
  setLoginStatus: (status: IUserContext["loginStatus"]) => void;
}

const UserContext = createContext<IUserContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext) as IUserContext;
}

function UserWrapper({ children }: UserWrapperProps) {
  const [currentUid, setCurrentUid] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginStatus, setLoginStatus] =
    useState<IUserContext["loginStatus"]>("idle");

  if (
    localStorage.getItem("userId") &&
    typeof localStorage.getItem("userId") === "string" &&
    currentUid === null
  ) {
    setCurrentUid(localStorage.getItem("userId"));
  }

  const loginMutation = useMutation({
    mutationFn: (user: LoginUser) => {
      return axios
        .post(`${baseURL}/login`, {
          userId: user.username,
          password: user.password,
        })
        .then((res) => {
          if (res.status !== 200) throw Error("Login failed!");
          return res.data as string;
        });
    },
    onError: (error) => {
      console.log(error);
      setLoginStatus("fail");
    },
    onSuccess: (uid: string) => {
      setLoginStatus("success");
      socket.connect();
      socket.emit("add-user", uid);
      setCurrentUid(uid);
      localStorage.setItem("userId", uid);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (user: RegisterUser) => {
      return axios
        .post(`${baseURL}/user/register`, {
          userName: user.userName,
          password: user.password,
          screenName: user.screenName,
          email: user.email,
          location: user.location,
          birthday: user.birthday,
        })
        .then((res) => {
          if (res.status !== 200) throw Error("Register failed!");
          return res.data as string;
        });
    },
    onError: (error) => {
      console.error(error);
      setLoginStatus("fail");
    },
    onSuccess(uid: string) {
      setLoginStatus("success");
      setCurrentUid(uid);
      socket.connect();
      socket.emit("add-user", uid);
      localStorage.setItem("userId", uid);
      console.log("Register successful");
    },
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
    setLoginStatus("loading");
    loginMutation.mutate({ username: username, password: password });
    console.log(socket);
  };

  const handleLogout = async () => {
    socket.emit("remove-active-user", currentUid);
    socket.disconnect();
    localStorage.removeItem("userId");
    setCurrentUid(null);
    setCurrentUser(null);
    try {
      const logoutQuery = await axios.get(`${baseURL}/logout`);
      if (logoutQuery.status === 200) {
        console.log("Logout successful!");
      }
    } catch (err) {
      console.log("Logout failed!");
      console.error(err);
    }
  };

  const handleRegister = async (
    username: string,
    password: string,
    screenName: string,
    email: string,
    location: string,
    birthday: Date,
  ) => {
    setLoginStatus("loading");
    if (!Date.parse(birthday.toString())) {
      setLoginStatus("fail");
      console.log("Invalid date");
      return;
    }
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
      if (currentUser && currentUid)
        return userService.getUserDetails(currentUser.userName);
    },
    enabled: !!currentUser,
  });

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        details: userDetailsQuery.data,
        socketId: socket.id || "",
        setUser: setCurrentUser,
        onLogin: handleLogin,
        onLogout: handleLogout,
        onRegister: handleRegister,
        loginStatus: loginStatus,
        setLoginStatus: setLoginStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserWrapper;
