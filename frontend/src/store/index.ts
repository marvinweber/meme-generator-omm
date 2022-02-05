import { configureStore } from "@reduxjs/toolkit";
import singleMemeViewSettingsReducer from "./slices/singleMemeViewSettingsSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    singleMemeViewSettings: singleMemeViewSettingsReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
