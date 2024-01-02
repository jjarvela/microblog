import axios from "axios";
const baseURL = "ourCoolBackend.com/posts";

function getPosts() {
    const request = axios.get(`${baseURL}`);
    return request.then(response => response.data);
}

function addNewPost() {
    const request = axios.post(`${baseURL}`);
    return request.then(response => response.data);
}

function editPost(id: string) {
    const request = axios.put(`${baseURL}/${id}`);
    return request.then(response => response.data);
}

function deletePost(id: string) {
    const request = axios.delete(`${baseURL}/${id}`);
    return request.then(response => response.data);
}

export default {getPosts, addNewPost, editPost, deletePost};