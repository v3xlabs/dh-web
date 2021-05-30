import { DefaultTheme } from "styled-components";

export const DarkTheme: DefaultTheme = {
    borderRadius: '8px',
    palette: {
        primary: {
            100: "#dee3ea",
            200: "#b2bdcd",
            300: "#5d7290", // Searchbar text color
            400: "#242c37", // Items hover
            500: "#5d7290", // "+" hover
            600: "#323d4d", // Separators and +
            700: "#242c37", // Bg (Explore more rooms)
            800: "#151a21", // Bg boxes
            900: "#0b0e11" // Main bg
        },
        accent: {
            default: "#fd4d4d",
            disabled: "#f5bfbf",
            hover: "#fd6868"
        },
        secondary: {
            default: "#5575e7",
            washedOut: "#879eed"
        },
        buttonText: '#fff'
    },
    animation: {
        micro: '180ms'
    },
    breakpoints: {
        one: 800,
        two: 1265,
        three: 1336
    }
};


export const LightTheme: DefaultTheme = {
    borderRadius: '0px',
    palette: {
        primary: {
            100: "#0b0e11",
            200: "#151a21",
            300: "#242c37", // Searchbar text color
            400: "#F1F1F1", // Items hover
            500: "#adadad", // "+" hover
            600: "#bdbdbd", // Separators and +
            700: "#ededed", // Bg (Explore more rooms)
            800: "#FFF", // Bg boxes
            900: "#F6F6F6" // Main Bg
        },
        accent: {
            default: "#fd4d4d",
            disabled: "#f5bfbf",
            hover: "#fd6868"
        },
        secondary: {
            default: "#5575e7",
            washedOut: "#879eed"
        },
        buttonText: '#2b2b2b'
    },
    animation: {
        micro: '180ms'
    },
    breakpoints: {
        one: 800,
        two: 1265,
        three: 1336
    }
};