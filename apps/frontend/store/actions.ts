import { CaseReducer, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./reducers";
import { fetchUsers } from "../api/fetchUsers";
import { upsertUser } from "../api/updateUser";
import { RootState } from "./store";
import { UserDto } from "../types/UserDto";

const _setUsers: CaseReducer<UserState, PayloadAction<UserDto[]>> = (
  state: UserState,
  action: PayloadAction<UserDto[]>
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
    const response = await upsertUser(users);
    thunkApi.dispatch(fetchUserList());
    return response;
  }
);

export { _setUsers, _setLoading, _setError, fetchUserList, updateUserData };
