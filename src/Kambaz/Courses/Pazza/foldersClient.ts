import axios from "axios";
import { Folder } from "../../types";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const FOLDERS_API = `${REMOTE_SERVER}/api/pazzaFolders`;

export const createFolder = async (name: string) => {
  console.log(name);
  const response = await axios.post(`${FOLDERS_API}`, { name });
  return response.data;
};

export const findAllFolders = async () => {
  const response = await axiosWithCredentials.get(FOLDERS_API);
  return response.data;
};

export const updateFolder = async (folder: Folder) => {
  const response = await axiosWithCredentials.put(
    `${FOLDERS_API}/${folder._id}`,
    folder
  );
  return response.data;
};

export const deleteFolders = async (folders: Folder[]) => {
  const promises = folders.map((f) =>
    axiosWithCredentials.delete(`${FOLDERS_API}/${f._id}`)
  );
  const response = await Promise.all(promises);
  return response;
};
