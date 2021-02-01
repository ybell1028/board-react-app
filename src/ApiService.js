import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/posts";

class ApiService {
    fetchPosts() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchPostByID(postID) {
        return axios.get(USER_API_BASE_URL + "/" + postID);
    }

    deletePost(postID) {
        return axios.delete(USER_API_BASE_URL + "/" + postID);
    }
    addPost(post) {
        return axios.post(USER_API_BASE_URL, post);
    }
    editPost(post) {
        return axios.put(USER_API_BASE_URL + "/" + post.id, post);
    }
}

export default new ApiService();
