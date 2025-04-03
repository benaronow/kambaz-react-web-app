/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { createDbEnrollment, deleteDbEnrollment } from "./enrollmentsClient";

const initialState = {
  enrollments: [],
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    addEnrollment: (state, { payload: enrollment }) => {
      createDbEnrollment(enrollment);
      const newEnrollment: any = {
        _id: uuidv4(),
        user: enrollment.user,
        course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    deleteEnrollment: (state, { payload: enrollment }) => {
      deleteDbEnrollment(enrollment._id);
      state.enrollments = state.enrollments.filter(
        (e: any) =>
          !(e.user === enrollment.user && e.course === enrollment.course)
      );
    },
    setEnrollments: (state, { payload: enrollments }) => {
      state.enrollments = enrollments;
    },
  },
});
export const { addEnrollment, deleteEnrollment, setEnrollments } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
