import axios from "axios";
import { serverUrl } from "../globalData";

async function getUserFollowing(userId: string) {
  const res = await axios.get(`${serverUrl}/user/${userId}/following`);
  return res.data;
}

async function getUserProfile(userId: string) {
  const res = await axios.get(`${serverUrl}/user/${userId}/profile`);
  return res.data;
}

// need more parameters?
async function addUserFollowing(userId: string) {
  const res = await axios.post(`${serverUrl}/user/${userId}/following`);
  return res.data;
}

async function deleteUserFollowing(userId: string) {
  const res = await axios.delete(`${serverUrl}/user/${userId}/following`);
  return res.data;
}

async function getUserFollowers(userId: string) {
  const res = await axios.get(`${serverUrl}/user/${userId}/followers`);
  return res.data;
}

async function getUserFollowingGroups(userId: string) {
  const res = await axios.get(`${serverUrl}/user/${userId}/followingGroups`);
  return res.data;
}

async function getUserConversations(userId: string) {
  const res = await axios.get(`${serverUrl}/user/${userId}/conversations`);
  return res.data;
}

async function addUser() {
  const res = await axios.post(`${serverUrl}/user/register`);
  return res.data;
}

export default {
  getUserFollowing,
  getUserProfile,
  addUserFollowing,
  deleteUserFollowing,
  getUserFollowers,
  getUserFollowingGroups,
  getUserConversations,
  addUser,
};