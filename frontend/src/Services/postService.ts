import axios from "axios";
import { serverUrl } from "../globalData";

function getPosts(userId: string, postId?: string) {
  return axios
    .get(`${serverUrl}/blog/${userId}` + (postId ? `/${postId}` : ""))
    .then((res) => res.data);
}

function addNewPost(newPost: BlogToServer, userId: string) {
  return axios.post(`${serverUrl}/blog/${userId}`, newPost);
}

function editPost(newPost: BlogToServer, userId: string, postId: number) {
  return axios.put(`${serverUrl}/blog/${userId}/${postId}`, newPost);
}

function deletePost(postIds: number[], userId: string) {
  return axios.delete(`${serverUrl}/blog/${userId}`, {
    data: { itemIds: postIds },
  }); // DELETE request does not necessarily support a request body
}

function sendPostMedia(userId: string, files: FormData) {
  return axios
    .post(`${serverUrl}/media/${userId}`, files, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

export default {
  getUserPosts: getPosts,
  getPosts,
  addNewPost,
  editPost,
  deletePost,
  sendPostMedia,
};
