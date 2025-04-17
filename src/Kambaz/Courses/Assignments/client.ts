/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const createDbAssignment = async (assignment: any) => {
  const response = await axiosWithCredentials.post(
    `${ASSIGNMENTS_API}`,
    assignment
  );
  return response.data;
};

export const fetchDbAssignments = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${ASSIGNMENTS_API}/${courseId}`
  );
  return data;
};

export const deleteDbAssignment = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${ASSIGNMENTS_API}/${assignmentId}`
  );
  return data;
};

export const updateDbAssignment = async (assignment: any) => {
  const { data } = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};
