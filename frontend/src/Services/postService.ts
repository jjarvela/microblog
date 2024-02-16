import axios from "axios";
import { serverUrl } from "../globalData";

function getPosts(userId: string, postId?: number) {
  return axios
    .get(`${serverUrl}/blog/${userId}` + (postId ? `?postId=${postId}` : ""))
    .then((res) => res.data);
}

function addNewPost(newPost: BlogPostToServer, userId: string) {
  return axios.post(`${serverUrl}/blog/${userId}`, newPost);
}

function editPost(newPost: BlogPostToServer, userId: string, postId: number) {
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

function addReaction(reaction: ReactionToServer) {
  if (reaction.blogpost_id) {
    return axios
      .post(`${serverUrl}/blog/${reaction.blogpost_id}/reactions`, reaction)
      .then((res) => res.data);
  } else if (reaction.media_id) {
    return "under construction";
  } else {
    return { error: "One reaction target must be specified" };
  }
}

function deleteReaction(postId: number, reactionId: number) {
  return axios.delete(`${serverUrl}/blog/${postId}/reactions/${reactionId}`);
}

export default {
  getUserPosts: getPosts,
  getPosts,
  addNewPost,
  editPost,
  deletePost,
  sendPostMedia,
  addReaction,
  deleteReaction,
};
