import { Theme } from "@react-navigation/native";

export const CustomDefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: "rgb(178, 37, 93)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(178, 37, 93)",
    border: "rgb(178, 37, 93)",
    notification: "rgb(178, 37, 93)",
  },
};

export const CustomDarkTheme: Theme = {
  dark: true,
  colors: {
    primary: "rgb(10, 132, 255)",
    background: "rgb(1, 1, 1)",
    card: "rgb(18, 18, 18)",
    text: "rgb(229, 229, 231)",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
};
