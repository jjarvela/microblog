import axios from "axios";
import { serverUrl } from "../globalData";

function queryPosts(param?: {
  hashtags?: string[];
  usernames?: string[];
  keyword?: string;
  startDate?: string;
  endDate?: string;
}) {
  return axios
    .get(
      `${serverUrl}/blog${param ? "?" : ""}${
        param?.hashtags ? "hashtags=" + param.hashtags : ""
      }${param?.hashtags && param.usernames ? "&" : ""}${
        param?.usernames ? "usernames=" + param.usernames : ""
      }${param?.usernames && param.keyword ? "&" : ""}${
        param?.keyword ? "keyword=" + param.keyword : ""
      }${param?.keyword && param.startDate ? "&" : ""}${
        param?.startDate && param.endDate ? "startDate=" + param.startDate : ""
      } ${param?.startDate ? "&" : ""}${
        param?.endDate ? "endDate=" + param.endDate : ""
      }`,
    )
    .then((res) => res.data);
}

function getPosts(userId: string, postId?: number) {
  return axios
    .get(`${serverUrl}/blog/${userId}` + (postId ? `?postId=${postId}` : ""))
    .then((res) => res.data);
}

function getUserReactions(userId: string, type?: string[]) {
  return axios
    .get(
      `${serverUrl}/blog/reactions?userId=${userId}${
        type ? "&type=" + type : ""
      }`,
    )
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

function getReactions(postId: number, type?: string[]) {
  return axios
    .get(
      `${serverUrl}/blog/${postId}/reactions?type=${
        type || ["like", "repost", "comment"]
      }`,
    )
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

function deleteReaction(postId: number, userId: string, type: string) {
  return axios.delete(
    `${serverUrl}/blog/${postId}/reactions?userId=${userId}&type=${type}`,
  );
}

export default {
  queryPosts,
  getUserPosts: getPosts,
  getUserReactions,
  getPosts,
  getReactions,
  addNewPost,
  editPost,
  deletePost,
  sendPostMedia,
  addReaction,
  deleteReaction,
};
