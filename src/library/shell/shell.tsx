import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { DarkTheme } from '../theme';

type ShellProps = {
    children: React.ReactNode;
};

export const Shell: FC<ShellProps> = ({ children }: ShellProps) => {

    return (
        <ThemeProvider theme={DarkTheme}>
            {
                children
            }
        </ThemeProvider>
    );
};