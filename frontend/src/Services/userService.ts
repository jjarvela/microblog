import axios from "axios";
const baseURL = "https://api.microblog.fi";

const debug = true;

const login = (username: string, password: string) => {
  // REMOVE ME LATER
  if (debug) return { token: "token-goes-here" };
  // TEST RETURN
  const request = axios.post(`${baseURL}/login`, {
    userId: username,
    password: password,
  });
  request
    .catch((e) => {
      if (e.request) {
        //request was made but no response received
        return e.request;
      } else if (e.response) {
        //response received and server responded with a status code
        return {
          status: e.response.status,
          message: e.response.message,
          content: e.response.data,
        };
      } else {
        //request setup threw error
        return e.message;
      }
    })
    .then((response) => {
      return response.data;
    });
};

const register = (
  username: string,
  password: string,
  screenName: string,
  email: string,
  location: string,
  birthday: Date,
) => {
  // REMOVE ME LATER
  if (debug)
    return {
      user: {
        username: username,
        password: password,
        screenName: screenName,
        email: email,
        location: location,
        birthday: birthday,
      },
      token: "token-goes-here",
    };
  // TEST RETURN
  const request = axios.post(`${baseURL}/register`, {
    username: username,
    password: password,
    screenName: screenName,
    email: email,
    location: location,
    birthday: birthday.toString(),
  });
  request
    .catch((e) => {
      if (e.request) {
        //request was made but no response received
        return e.request;
      } else if (e.response) {
        //response received and server responded with a status code
        return {
          status: e.response.status,
          message: e.response.message,
          content: e.response.data,
        };
      } else {
        //request setup threw error
        return e.message;
      }
    })
    .then((response) => {
      return response.data;
    });
};

export default { login, register };
