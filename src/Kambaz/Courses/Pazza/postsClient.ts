import axios from "axios";
import { Post } from "../../types";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const POSTS_API = `${REMOTE_SERVER}/api/pazzaPosts`;

export const createPost = async (post: Post) => {
  const response = await axios.post(`${POSTS_API}`, post);
  return response.data;
};

export const findAllPosts = async () => {
  const response = await axiosWithCredentials.get(POSTS_API);
  return response.data;
};

export const findPostById = async (postId: string) => {
  const response = await axiosWithCredentials.get(`${POSTS_API}/${postId}`);
  return response.data;
};

export const updatePost = async (post: Post) => {
  const response = await axiosWithCredentials.put(
    `${POSTS_API}/${post._id}`,
    post
  );
  return response.data;
};
