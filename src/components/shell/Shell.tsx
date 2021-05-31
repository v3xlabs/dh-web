import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import Head from "next/head";
import React, { FC } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import ws from "ws";

import NoSsr from "../../library/ssr/NoSsr";
import { DarkTheme } from "../../library/theme";

type ShellProperties = {
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
    a {
        text-decoration: none;
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
    background: ${({ theme }) => theme.palette.primary["900"]};
    overflow-y: auto;
    overflow-x: hidden;
`;

// get the authentication token from local storage if it exists
const authToken = process.browser ? localStorage.getItem("@dh/token") || "" : "";
const bearerString = authToken ? `Bearer ${authToken}` : "";
// cross platform web socketing triage (tldr use node lib on server and web lib on browser)
const webSocketImplementation = process.browser ? WebSocket : ws;

const wsLink = new WebSocketLink({
    uri: "wss://api.dogehouse.online/graphql",
    options: {
        reconnect: true,
        connectionParams: {
            authorization: bearerString
        }
    },
    webSocketImpl: webSocketImplementation
});

const httpLink = createHttpLink({
    uri: "https://api.dogehouse.online/graphql",
});

const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: bearerString,
        }
    };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        for (const { message, locations, path } of graphQLErrors) {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            );
        }
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        if (networkError.message.includes("500")) {
            console.error("500 Yup");
            if (!location.href.includes("/login")) {
                localStorage.removeItem("@dh/token");
                location.replace("/login?redirect_uri=" + encodeURIComponent(location.href));
            }
        }
    }
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    (authLink.concat(httpLink)),
);

const client = new ApolloClient({
    link: from([errorLink, splitLink]),
    cache: new InMemoryCache(),
});

export const Shell: FC<ShellProperties> = ({ children }: ShellProperties) => {

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