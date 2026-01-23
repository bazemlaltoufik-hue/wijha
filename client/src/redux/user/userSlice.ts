import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },

    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
    },

    deleteSuccess: (state, action) => {
      state.currentUser = null;
    },
    signout: (state) => {
      state.currentUser = null;
    },
    saveJob: (state, action) => {
      if (state.currentUser) {
        state.currentUser.saved.push(action.payload);
      }
    },
    removeSavedJob: (state, action) => {
      if (state.currentUser) {
        state.currentUser.saved = state.currentUser.saved.filter(
          (jobId: string) => jobId !== action.payload,
        );
      }
    },
  },
});

export const {
  signInSuccess,
  updateSuccess,
  deleteSuccess,
  signout,
  saveJob,
  removeSavedJob,
} = userSlice.actions;

export default userSlice.reducer;
