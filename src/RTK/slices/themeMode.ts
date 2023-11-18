import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DARK, LIGHT } from "../type";

interface initialStateType {
  mode: "dark" | "light";
}

const initialState: initialStateType = {
  mode: DARK,
};

const themeModeSlice = createSlice({
  name: "themeModeSlice",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<"dark" | "light">) => {
      return {
        mode: action.payload === DARK ? LIGHT : DARK,
      };
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;
export default themeModeSlice.reducer;
