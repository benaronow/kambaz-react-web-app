/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  createDbAssignment,
  deleteDbAssignment,
  updateDbAssignment,
} from "./client";

const initialState = {
  assignments: [],
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      createDbAssignment(assignment);
      const newAssigment: any = {
        _id: uuidv4(),
        title: assignment.title,
        description: assignment.description,
        course: assignment.course,
        startMonth: assignment.startMonth,
        startDay: assignment.startDay,
        endMonth: assignment.endMonth,
        endDay: assignment.endDay,
        untilMonth: assignment.untilMonth,
        untilDay: assignment.untilDay,
      };
      state.assignments = [...state.assignments, newAssigment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      deleteDbAssignment(assignmentId);
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assigment }) => {
      updateDbAssignment(assigment);
      state.assignments = state.assignments.map((a: any) =>
        a._id === assigment._id ? assigment : a
      ) as any;
    },
    editAssignment: (state, { payload: assigmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assigmentId ? { ...a, editing: true } : a
      ) as any;
    },
    setAssignments: (state, { payload: assignments }) => {
      state.assignments = assignments;
    },
  },
});
export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
  setAssignments,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
