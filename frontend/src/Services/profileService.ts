import axios from "axios";
import { serverUrl } from "../globalData";
import { ProfileBox } from "../Components/Elements/ProfileElements/ProfileBoxes/ProfileBoxes";

async function getUserProfile(userId: string) {
  const res = await axios.get(`${serverUrl}/user/${userId}/profile`);
  return res.data;
}

async function editUserProfile(userId: string, obj: Partial<UserProfile>) {
  const res = await axios.put(`${serverUrl}/user/${userId}/profile`, obj);
  return res.data;
}

function getProfileElements(userId: string) {
  return axios
    .get(`${serverUrl}/user/${userId}/profile/elements`)
    .then((res) => res.data);
}

function editProfileElements(userId: string, data: ProfileBox[]) {
  return axios
    .post(`${serverUrl}/user/${userId}/profile/elements`, data)
    .then((res) => res.data);
}

export default {
  getUserProfile,
  editUserProfile,
  getProfileElements,
  editProfileElements,
};
