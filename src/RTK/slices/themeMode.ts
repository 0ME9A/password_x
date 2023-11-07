import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  mode: "dark" | "light";
}

const initialState: initialStateType = {
  mode: "dark",
};

const themeModeSlice = createSlice({
  name: "themeModeSlice",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<"dark" | "light">) => {
      return {
        mode: action.payload === "dark" ? "light" : "dark",
      };
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;
export default themeModeSlice.reducer;
