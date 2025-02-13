import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserList,
  _setError,
  _setLoading,
  _setUsers,
  updateUserData,
} from "./actions";
import { ReadUserDto } from "@repo/shared-types";

export interface UserState {
  users: ReadUserDto[];
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: _setUsers,
    setLoading: _setLoading,
    setError: _setError,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user";
      });
  },
});

export const { setUsers, setError, setLoading } = userSlice.actions;
export default userSlice.reducer;
