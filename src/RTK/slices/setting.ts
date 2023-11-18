import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PasswordAttributesType } from "../../components/types/PasswordAttributesType";

export interface SettingState {
  salt: boolean;
  passwordAttributes: PasswordAttributesType;
}

const initialState: SettingState = {
  salt: false,
  passwordAttributes: {
    upper: true,
    lower: true,
    symbol: true,
    number: true,
    length: 8,
    salt: "",
    saltAt: "e",
  },
};

const settingProps = createSlice({
  name: "settingProps",
  initialState,
  reducers: {
    setSalt: (state, action: PayloadAction<boolean>) => {
      return { ...state, salt: action.payload };
    },
    setPasswordAttributes: (
      state,
      action: PayloadAction<PasswordAttributesType>
    ) => {
      return { ...state, passwordAttributes: action.payload };
    },
  },
});

export const { setSalt, setPasswordAttributes } = settingProps.actions;

export default settingProps.reducer;
