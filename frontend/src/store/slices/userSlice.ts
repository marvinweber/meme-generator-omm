import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiClient } from "../..";

/** Type of login used (e.g., via Google Sign In, or via Username/ Password). */
export type LOGIN_TYPE = "GOOGLE_OAUTH" | "OMM_EMAIL_PASSWORD";

interface UserState {
  loggedIn: boolean;
  loginType: LOGIN_TYPE;
  user: {
    _id?: string;
    email?: string;
    name?: string;
    imageUrl?: string;
    token?: string;
  };
}

const initialState: UserState = {
  loggedIn: false,
  loginType: "GOOGLE_OAUTH",
  user: {
    _id: undefined,
    email: undefined,
    name: undefined,
    imageUrl: undefined,
    token: undefined,
  },
};

type UserLoginPayload = {
  loginType: LOGIN_TYPE;
  _id: string;
  email: string;
  name: string;
  imageUrl?: string;
  token?: string;
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<UserLoginPayload>) => {
      // add authorization header to api client
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;

      state.loggedIn = true;
      state.loginType = action.payload.loginType;
      state.user._id = action.payload._id;
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.user.imageUrl = action.payload.imageUrl;
      state.user.token = action.payload.token;
    },
    logout: (state) => {
      // remove authorization header from api client
      apiClient.defaults.headers.common["Authorization"] = false;

      state.loggedIn = false;
      state.user._id = undefined;
      state.user.email = undefined;
      state.user.name = undefined;
      state.user.imageUrl = undefined;
      state.user.token = undefined;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
