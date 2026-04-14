import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enrollments: [] as any[],
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
    addEnrollment: (state, { payload }) => {
      state.enrollments = [...state.enrollments, payload];
    },
    removeEnrollment: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
      );
    },
  },
});
export const { setEnrollments, addEnrollment, removeEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;