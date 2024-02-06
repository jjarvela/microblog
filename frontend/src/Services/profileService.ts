import axios from "axios";
import { serverUrl } from "../globalData";
import { ProfileBox } from "../Components/Elements/ProfileElements/ProfileBoxes/ProfileBoxes";

function getProfileElements(userId: string) {
  return axios
    .get(`${serverUrl}/profile/elements/${userId}`)
    .then((res) => res.data);
}

function editProfileElements(userId: string, data: ProfileBox[]) {
  return axios
    .post(`${serverUrl}/profile/elements/${userId}`, data)
    .then((res) => res.data);
}

export default {
  getProfileElements,
  editProfileElements,
};
