import { CaseReducer, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./reducers";
import { fetchUsers } from "../api/fetchUsers";
import { updateUser } from "../api/updateUser";
import { RootState } from "./store";
import { ReadUserDto } from "@repo/shared-types";

const _setUsers: CaseReducer<UserState, PayloadAction<ReadUserDto[]>> = (
  state: UserState,
  action: PayloadAction<ReadUserDto[]>
) => {
  state.users = action.payload;
  state.loading = false;
};

const _setLoading: CaseReducer<UserState> = (state) => {
  state.loading = true;
};

const _setError: CaseReducer<UserState, PayloadAction<string>> = (
  state,
  action
) => {
  state.error = action.payload;
  state.loading = false;
};

const fetchUserList = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetchUsers();
  return response;
});

const updateUserData = createAsyncThunk(
  "user/updateUser",
  async (id: string | null, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    let users = state.user.users;
    if (id) {
      users = users.filter((user) => user.id === id);
    }
    const response = await updateUser(users);
    thunkApi.dispatch(fetchUserList());
    return response;
  }
);

export { _setUsers, _setLoading, _setError, fetchUserList, updateUserData };
