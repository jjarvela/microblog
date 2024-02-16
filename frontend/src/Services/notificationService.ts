import axios from "axios";
import { serverUrl } from "../globalData";

function getUserNotifications(param: {
  userId: string;
  read?: string;
  type?: string[];
}) {
  return axios
    .get(
      `${serverUrl}/user/${param.userId}/notifications${
        param.read || param.type ? "?" : ""
      }${param.read ? "readStatus=" + param.read : ""} ${
        param.read && param.type ? "&" : ""
      } ${param.type ? "type=" + param.type : ""}`,
    )
    .then((res) => res.data);
}

function handleNotificationReadStatus(userId: string, read: string[]) {
  return axios
    .put(`${serverUrl}/user/${userId}/notifications?readStatus=${read}`)
    .then((res) => res.data);
}

export default { getUserNotifications, handleNotificationReadStatus };
