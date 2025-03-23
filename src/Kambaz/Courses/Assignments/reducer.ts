/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignments,
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
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
    deleteAssigment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssigment: (state, { payload: assigment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assigment._id ? assigment : a
      ) as any;
    },
    editAssigment: (state, { payload: assigmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assigmentId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});
export const {
  addAssignment,
  deleteAssigment,
  updateAssigment,
  editAssigment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
