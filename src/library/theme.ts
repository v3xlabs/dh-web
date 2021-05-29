import { DefaultTheme } from "styled-components";

export const DarkTheme: DefaultTheme = {
    borderRadius: '10px',
    palette: {
        primary: {
            100: "#dee3ea",
            200: "#b2bdcd",
            300: "#5d7290",
            600: "#323d4d",
            700: "#242c37",
            800: "#151a21",
            900: "#0b0e11"
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