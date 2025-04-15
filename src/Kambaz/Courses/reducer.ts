/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { deleteDbCourse, updateDbCourse } from "./client";

const initialState = {
  courses: [],
};
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: course }) => {
      state.courses = [...state.courses, course] as any;
    },
    deleteCourse: (state, { payload: courseId }) => {
      deleteDbCourse(courseId);
      state.courses = state.courses.filter((c: any) => c._id !== courseId);
    },
    updateCourse: (state, { payload: course }) => {
      updateDbCourse(course);
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      ) as any;
    },
    editCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === courseId ? { ...c, editing: true } : c
      ) as any;
    },
    setCourses: (state, { payload: courses }) => {
      state.courses = courses;
    },
  },
});
export const { addCourse, deleteCourse, updateCourse, editCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;
