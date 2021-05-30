import React, { FC } from 'react';
import { DarkTheme, LightTheme } from '../../library/theme';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import NoSsr from '../../library/ssr/NoSSR';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

type ShellProps = {
    children: React.ReactNode;
};

const GlobalStyle = createGlobalStyle`
    html, body {
        width: 100vw;
        height: 100vh;
        padding: 0;
        margin: 0;
        font-family: Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
        color: ${({ theme }) => theme.palette.buttonText};
        background: ${({ theme }) => theme.palette.primary[900]};
        font-size: 1.4rem;
    }
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    :root {
        font-size: 10px;
        line-height: 21px;
    }
    input {
        background: transparent;
        border: none;
        outline: none;
        font-size: 100%;
        color: inherit;
        font-family: inherit;
        line-height: inherit;
    }
    input::placeholder {
        color: ${({ theme }) => theme.palette.primary[300]};
    }
    #nprogress {
        position: relative;
        z-index: 9999999;
    }

    #nprogress .bar {
        background: ${({ theme }) => theme.palette.accent.hover} !important;
    }

    #nprogress .peg {
        box-shadow: 0 0 10px ${({ theme }) => theme.palette.accent.hover}, 0 0 5px ${({ theme }) => theme.palette.accent.hover} !important;
    }

    #nprogress .spinner-icon {
        border-top-color: ${({ theme }) => theme.palette.accent.hover} !important;
        border-left-color: ${({ theme }) => theme.palette.accent.hover} !important;
    }
`;

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: ${({ theme }) => theme.palette.primary['900']};
    overflow-y: auto;
    overflow-x: hidden;
`;

const httpLink = createHttpLink({
    uri: 'https://api.dogehouse.online/graphql',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = process.browser ? localStorage.getItem('@dh/token') || '' : '';
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export const Shell: FC<ShellProps> = ({ children }: ShellProps) => {

    return (
        <ThemeProvider theme={DarkTheme}>
            <ApolloProvider client={client}>
                <GlobalStyle />
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
                </Head>

                <Wrapper>
                    <NoSsr>
                        {
                            children
                        }
                    </NoSsr>
                </Wrapper>
            </ApolloProvider>
        </ThemeProvider>
    );
};