import axios from "axios";
import { serverUrl } from "../globalData";

// User Data

async function getUser(userId: string) {
  const res = await axios.get(`${serverUrl}/user/${userId}`);
  return res.data;
}

async function addUser() {
  const res = await axios.post(`${serverUrl}/user/register`);
  return res.data;
}

async function editUser(userId: string, userObj: Partial<User>) {
  const res = await axios.put(`${serverUrl}/user/${userId}`, userObj);
  return res.data;
}

async function deleteUser(userId: string) {
  const res = await axios.delete(`${serverUrl}/user/${userId}`);
  return res.data;
}

async function getUserId(userName: string) {
  const res = await axios.get(`${serverUrl}/user/id/${userName}`);
  return res.data;
}

async function getUserDetails(username: string) {
  const res = await axios.get(`${serverUrl}/user/${username}/details`);
  return res.data;
}

// Following

async function getUserFollowing(userId: string) {
  const res = await axios.get(`${serverUrl}/user/${userId}/following`);
  return res.data;
}

async function addUserFollowing(
  userId: string,
  followsUserId?: string,
  followsGroup?: string,
) {
  const res = await axios.post(
    `${serverUrl}/user/${userId}/following`,
    undefined,
    { params: { followsUser: followsUserId, followsGroup: followsGroup } },
  );
  return res.data;
}

async function deleteUserFollowing(userId: string, followId?: number) {
  const res = await axios.delete(`${serverUrl}/user/${userId}/following`, {
    data: { id: followId },
  });
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

// Conversations

async function getUserConversations(userId: string) {
  const res = await axios.get(`${serverUrl}/user/${userId}/conversations`);
  return res.data;
}

export default {
  getUser,
  addUser,
  editUser,
  deleteUser,
  getUserId,
  getUserDetails,
  getUserFollowing,
  addUserFollowing,
  deleteUserFollowing,
  getUserFollowers,
  getUserFollowingGroups,
  getUserConversations,
};
