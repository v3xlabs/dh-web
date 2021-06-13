import { PreDefinedThemes, themeDeserializer, themeSerializer, validateThemeContainsKeys } from "../library/theme";
import React, { FC, useState } from "react";
import { resetTheme, selectTheme, writeTheme } from "../store/dynamicThemeReducer";
import styled, { useTheme } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../components/button/Button";
import { FriendsList } from "../components/friends/FriendsList";
import { Grid } from "../components/grid/Grid";
import { Logo } from "../components/logo/Logo";
import { NextSeo } from "next-seo";
import { ProfileWidgetDataContainer } from "../components/user/ProfileWidget";
import { ScheduleDataContainer } from "../components/schedule/Schedule";
import { TextArea } from "../components/inputs/input";
import store from "../store/store";
import useMediaQuery from "../library/hooks/useMediaQuery";

const Column = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-rows: 4rem 640px;
    row-gap: 60px;
`;

const ThemeEditorBox = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    justify-content: center;
`;

const ThemeEditorButton = styled(Button)`
    align-self: flex-end;
`;

const ThemeEditorActions = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: flex-end;
`;

const SettingTitle = styled.div`
    display: block;
    font-size: 2rem;
    line-height: 3.1rem;
    font-weight: 700;
    padding-top: 0.5rem;
    color: ${({ theme }) => theme.palette.primary[100]};
`;


const SettingsPage: FC = () => {

    const theme = useTheme();
    const dispatch = useDispatch();

    const one = useMediaQuery(`(min-width:${theme.breakpoints.one + 1}px)`);
    const two = useMediaQuery(`(min-width:${theme.breakpoints.two + 1}px)`);
    const three = useMediaQuery(`(min-width:${theme.breakpoints.three + 1}px)`);
    const predefinedSiteThemesKeys = Object.keys(PreDefinedThemes);

    const reducerAppTheme = useSelector(selectTheme);

    const [editorTheme, setEditorTheme] = useState(reducerAppTheme);
    const [selectedPredefinedTheme, setPredefinedTheme] = useState("");
    const [isThemeValid, setIsThemeValid] = useState(true);
    const [themeValidationErrorMessage, setThemeValidationErrorMessage] = useState("");
    /* Used to generate rows for the editor textarea */
    const editorThemeNewLines = (editorTheme.match(/\n/g) || "").length + 1;


    /**
     * can change select value to one of the predefined themes
     */
    const handlePreDefinedThemeChange = (event) => {
        const currentTargetValue = event.target.value;
        if (predefinedSiteThemesKeys.includes(currentTargetValue)) {
            setPredefinedTheme(currentTargetValue);
            setEditorTheme(themeSerializer(PreDefinedThemes[currentTargetValue]));
        }
    };

    const handleThemeSubmission = async () => {
        if (editorTheme !== reducerAppTheme) {
            /**
             * @TODO add styled-components schema 
             * validation to check if all properties
             * valid if they exist. Currently only checking
             * for existence.
             */
            const {success: isSubmittedThemeValid, error}  = await validateThemeContainsKeys(themeDeserializer(editorTheme));

            if (!isSubmittedThemeValid) {
                setIsThemeValid(false);
                setThemeValidationErrorMessage(error.message);
                return;
            }


            if (isSubmittedThemeValid) {
                dispatch(writeTheme(editorTheme));
            }
        }
    };

    const handleResetTheme = () => {
        dispatch(resetTheme());
        setPredefinedTheme("");
        setEditorTheme(store.getState().dynamicThemeReducer.theme);
        // the default theme will always be valid
        setIsThemeValid(true);
        setThemeValidationErrorMessage("");
    };

    return <>
        <NextSeo
            defaultTitle="Dogehouse Revived"
            title="Settings | Dogehouse Revived"
            description="Taking voice conversations to the moon 🚀"
            additionalLinkTags={[
                {
                    rel: "icon",
                    href: "https://cdn.lvk.sh/dogehouse/logo.svg",
                },
                {
                    rel: "apple-touch-icon",
                    href: "https://cdn.lvk.sh/dogehouse/logo.svg",
                    sizes: "76x76"
                }
            ]}
        />
        <Grid>
            {
                one &&
                <Column>
                    <Logo small={!three} />
                    <FriendsList />
                </Column>
            }
            <Column>
                <div>
                    <ProfileWidgetDataContainer />
                    <ThemeEditorBox>
                        <SettingTitle>Theme Editor</SettingTitle>
                        {/* @TODO implement a bit of a nicer Error box. */}
                        {(!isThemeValid && themeValidationErrorMessage) && (
                            <>
                                <p>Theme is not valid try to reset it or make sure all properties are accounted for.</p>
                                <p>{themeValidationErrorMessage}</p>
                            </>
                        )}
                        <div style={{
                            alignSelf: "flex-end"
                        }}>
                            <label>
                                <p>Pick a pre-defined theme (optional):</p>
                                <select style={{ width: "100%" }} value={selectedPredefinedTheme} onChange={handlePreDefinedThemeChange}>
                                    <option value=''></option>
                                    {predefinedSiteThemesKeys.map(item =>
                                        <option key={item} value={item}>{item}</option>
                                    )}
                                </select>
                            </label>
                        </div>
                        <TextArea
                            onChange={event => setEditorTheme(event.target.value)}
                            rows={editorThemeNewLines}
                            style={{ width: "100%" }}
                            value={editorTheme}
                        />
                        <ThemeEditorActions>
                            <ThemeEditorButton onClick={handleResetTheme} variant="PRIMARY">Reset Theme</ThemeEditorButton>
                            <ThemeEditorButton onClick={handleThemeSubmission} variant="ACCENT">Apply Theme</ThemeEditorButton>
                        </ThemeEditorActions>
                    </ThemeEditorBox>
                </div>
            </Column>
            {
                two &&
                <Column>
                    <div>
                        <ProfileWidgetDataContainer />
                        <ScheduleDataContainer />
                    </div>
                </Column>
            }
        </Grid>
    </>;
};

export default SettingsPage;
