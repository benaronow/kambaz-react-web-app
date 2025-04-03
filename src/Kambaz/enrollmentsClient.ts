/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
export const createDbEnrollment = async (enrollment: any) => {
  const response = await axios.post(`${ENROLLMENTS_API}`, enrollment);
  return response.data;
};
export const fetchDbEnrollments = async () => {
  const { data } = await axios.get(`${ENROLLMENTS_API}`);
  return data;
};
export const deleteDbEnrollment = async (enrollment: any) => {
  const { data } = await axios.delete(`${ENROLLMENTS_API}`, enrollment);
  return data;
};
