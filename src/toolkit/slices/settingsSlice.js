import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark-theme",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme =
        state.theme === "light-theme" ? "dark-theme" : "light-theme";
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function

export const { toggleTheme, setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
