import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  loggedIn: boolean;
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
  user: {
    _id: undefined,
    email: undefined,
    name: undefined,
    imageUrl: undefined,
    token: undefined,
  },
};

type UserLoginPayload = {
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
      state.loggedIn = true;
      state.user._id = action.payload._id;
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.user.imageUrl = action.payload.imageUrl;
      state.user.token = action.payload.token;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user.email = undefined;
      state.user.name = undefined;
      state.user.imageUrl = undefined;
      state.user.token = undefined;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
