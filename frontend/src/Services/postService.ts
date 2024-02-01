import axios from "axios";
import { serverUrl } from "../globalData";
const baseURL = "ourCoolBackend.com/posts";

function getUserPosts(userId: string) {
  return axios.get(serverUrl + "/blog/" + userId).then((res) => res.data);
}

function getPosts(id?: string) {
  if (id) {
    const request = axios.get(`${baseURL}/${id}`);
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
  }

  const request = axios.get(`${baseURL}`);
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
      return { status: response.status, content: response.data };
    });
}

function addNewPost() {
  const request = axios.post(`${baseURL}`);
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
      return { status: response.status, content: response.data };
    });
}

function editPost(id: string) {
  const request = axios.put(`${baseURL}/${id}`);
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
      return { status: response.status, content: response.data };
    });
}

function deletePost(id: string) {
  const request = axios.delete(`${baseURL}/${id}`);
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
      return { status: response.status, content: response.data };
    });
}

export default { getUserPosts, getPosts, addNewPost, editPost, deletePost };
