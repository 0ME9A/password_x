import {
  PasswordAttributesType,
  ProPasswordReturnType,
} from "./PasswordAttributesType";

type historyProps = {
  bookmark: boolean;
};

type advanceSettings = {
  salt: boolean;
  passwordAttributes: PasswordAttributesType;
};

type settingProps = {
  mode: "dark" | "light";
  historyProps: historyProps;
  advance: advanceSettings;
};

interface historyItem extends ProPasswordReturnType {
  time: string;
}

type chromeStoragePropsType = {
  history: historyItem[];
  settings: settingProps;
};

export default chromeStoragePropsType;
export type { settingProps, historyItem, historyProps, advanceSettings };
