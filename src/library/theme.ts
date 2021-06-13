import { DefaultTheme } from "styled-components";
import * as yup from "yup";

export const DarkTheme: DefaultTheme = {
    borderRadius: "8px",
    palette: {
        primary: {
            100: "#dee3ea",
            200: "#b2bdcd",
            300: "#5d7290", // Searchbar text color
            400: "#5d7290", // Items hover
            500: "#5d7290", // "+" hover
            600: "#323d4d", // Separators and +
            700: "#242c37", // Bg (Explore more rooms) + hover
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
        buttonText: "#fff"
    },
    animation: {
        micro: "180ms"
    },
    breakpoints: {
        one: 800,
        two: 1265,
        three: 1336
    }
};

export const LightTheme: DefaultTheme = {
    borderRadius: "0px",
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
        buttonText: "#2b2b2b"
    },
    animation: {
        micro: "180ms"
    },
    breakpoints: {
        one: 800,
        two: 1265,
        three: 1336
    }
};

export const PreDefinedThemes = {
    DarkTheme, LightTheme
};

export const themeSerializer = (theme: DefaultTheme): string => JSON.stringify(theme, undefined, 4);
export const themeDeserializer = (theme: string): DefaultTheme => JSON.parse(theme);


type ValidateThemeReturnValue = Readonly<{
    success: boolean
    error?: Error
}>
/**
 * Ensures that passed-in theme sets contain
 * all the properties from the default theme.
 * It is used for validation when inputting new themes. 
 * It currently does not validate styled property values.
 */
export const validateThemeContainsKeys = async (theme: DefaultTheme): Promise<ValidateThemeReturnValue> => {
    try {
        await validation.validate(theme, {abortEarly: false});
        return  {
            success: true,
            error: undefined
        };
    } catch (error) {
       
        return {
            success: false,
            error: error
        };
    }
};



export const validation = yup.object().shape({
    borderRadius: yup.string().required(),
    palette: yup.object().shape({
        primary: yup.object().shape({
            100: yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),
            200: yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),
            300: yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),
            400: yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),
            500: yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),
            600: yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),
            700: yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),
            800: yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),
            900: yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),
        }),
        accent:yup.object().shape({
            default: yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),
            disabled: yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),
            hover: yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),
        }),
        secondary:  yup.object().shape({
            default: yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),
            washedOut: yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),
        }),
        buttonText:yup.string().required().matches(/^#([\da-f]{3}|[\da-f]{6})$/i),   

    }),
    animation: yup.object().shape({

        micro: yup.string().required(),
    }),
    breakpoints: yup.object().shape({
        one: yup.number().positive().integer().required(),
        two:yup.number().positive().integer().required(),
        three: yup.number().positive().integer().required(),

    })
});
