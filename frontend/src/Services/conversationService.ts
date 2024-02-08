import axios from "axios";
import { serverUrl } from "../globalData";

function getUserConversations(userId: string) {
  return axios
    .get(`${serverUrl}/user/${userId}/conversations`, { withCredentials: true })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
}

function createConversation(newConversation: NewConversation) {
  return axios
    .post(`${serverUrl}/conversation/`, newConversation, {
      withCredentials: true,
    })
    .then((res) => res.data);
}

function getConversation(conversationId: number) {
  return axios
    .get(`${serverUrl}/conversation/${conversationId}`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}

function getMessages(conversationId: number) {
  console.log("get messages request");
  return axios
    .get(`${serverUrl}/conversation/${conversationId}/messages`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}

function addNewMessage(
  conversationId: string,
  message: NewConversationMessage,
) {
  return axios
    .post(`${serverUrl}/conversation/${conversationId}`, message, {
      withCredentials: true,
    })
    .then((res) => res.data);
}

function editMessage(conversationId: number, messageId: number) {
  return axios.put(`${serverUrl}/conversation/${conversationId}/${messageId}`, {
    withCredentials: true,
  });
}

function deleteConversation(conversationId: number) {
  return axios
    .delete(`${serverUrl}/conversation/${conversationId}/`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}

function deleteMessage(conversationId: number) {
  return axios.delete(`${serverUrl}/conversation/${conversationId}`, {
    withCredentials: true,
  });
}

export default {
  getUserConversations,
  createConversation,
  getConversation,
  getMessages,
  addNewMessage,
  editMessage,
  deleteConversation,
  deleteMessage,
};
