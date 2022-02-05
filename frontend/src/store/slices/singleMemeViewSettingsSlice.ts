import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SingleMemeViewSettingsState {
  shuffle: boolean;
  autoplay: boolean;
}

const initialState: SingleMemeViewSettingsState = {
  shuffle: false,
  autoplay: false,
};

export const singleMemeViewSettingsSlice = createSlice({
  name: "singleMemeViewSettings",
  initialState: initialState,
  reducers: {
    toggleShuffle: (state, action: PayloadAction<boolean>) => {
      state.shuffle = action.payload;
    },
    toggleAutoplay: (state, action: PayloadAction<boolean>) => {
      state.autoplay = action.payload;
    },
  },
});

export const { toggleShuffle, toggleAutoplay } =
  singleMemeViewSettingsSlice.actions;

export default singleMemeViewSettingsSlice.reducer;
