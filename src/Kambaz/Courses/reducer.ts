/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { createCourse } from "../Account/client";
import { deleteDbCourse, updateDbCourse } from "./client";

const initialState = {
  courses: [],
  allCourses: [],
};
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: course }) => {
      createCourse(course);
      const newCourse: any = {
        _id: uuidv4(),
        name: course.name,
        number: course.number,
        startDate: course.startDate,
        endDate: course.endDate,
        department: course.department,
        credits: course.credits,
        description: course.description,
      };
      state.courses = [...state.courses, newCourse] as any;
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
    setAllCourses: (state, { payload: allCourses }) => {
      state.allCourses = allCourses;
    },
  },
});
export const {
  addCourse,
  deleteCourse,
  updateCourse,
  editCourse,
  setCourses,
  setAllCourses,
} = coursesSlice.actions;
export default coursesSlice.reducer;
