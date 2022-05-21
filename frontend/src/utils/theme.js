import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    100: "#B5BBA8",
    200: "#A8AF9A",
    300: "#9CA48B",
    400: "#8F997D",
    500: "#838D6F",
    600: "#757E63",
    700: "#687058",
    800: "#5A614C",
    900: "#4C5240",
  },
  white: {
    100: "#FFFFFF",
    200: "#F9F9F9",
  },
  red: "#BB5C5C",
};

const customTheme = extendTheme({ colors });

export default customTheme;
