import { DefaultTheme } from "styled-components";

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

/**
 * Ensures that passed-in theme sets contain
 * all the properties from the default theme.
 * It is used for validation when inputting new themes. 
 * It currently does not validate styled property values.
 */
export const validateThemeContainsKeys = (theme: DefaultTheme, defaultThemeObject = DarkTheme): boolean => {

    /**
     * Converts all nested and root level properties
     * into a flat array of keys using recursion.
     * @example {key: {nestedProp: ""}} => ["key", "key.nestedProp"]
     */
    const keyify = (object: DefaultTheme, prefix = ""): Array<string> =>
        // eslint-disable-next-line unicorn/no-array-reduce
        Object.keys(object).reduce((results, element) => {
            if (Array.isArray(object[element])) {
                return results;
            } else if (typeof object[element] === "object" && object[element] !== null) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                return [...results, ...keyify(object[element], prefix + element + ".")];
            }
            return [...results, prefix + element];
        }, []);

    const passedInThemeKeys = keyify(theme);
    const defaultThemeObjectKeys = keyify(defaultThemeObject);

    const isInsidePassedInKeys = (currentValue: string) => passedInThemeKeys.includes(currentValue);

    /** Checking that the passed in theme contains all of the 
     * keys that exist in the default theme. And making sure 
     * that the keys are of the same length. There should be
     * no more and no less keys than in the default theme. 
     */
    return defaultThemeObjectKeys.every((element) => isInsidePassedInKeys(element))
        && passedInThemeKeys.length === defaultThemeObjectKeys.length;
};