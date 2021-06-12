import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultTheme } from "styled-components";

import { DarkTheme, themeDeserializer, themeSerializer } from "../library/theme";
import { RootState } from "./store";

const initialState = {
    theme: themeSerializer(DarkTheme)
};

export const dynamicThemeSlice = createSlice({
    name: "dynamicTheme",
    initialState,
    reducers: {
        resetTheme: state => {
            state.theme = themeSerializer(DarkTheme);
        },
        writeTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        }
    }
});

export const { resetTheme, writeTheme } = dynamicThemeSlice.actions;

export const selectTheme = (state: RootState): string => state.dynamicThemeReducer.theme;
export const selectDerivedTheme = (state: RootState): DefaultTheme => themeDeserializer(state.dynamicThemeReducer.theme);

export default dynamicThemeSlice.reducer;