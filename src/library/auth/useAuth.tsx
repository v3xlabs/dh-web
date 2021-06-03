import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import parseURL from "url-parse";

import { AuthResourceReducerAction } from "../../store/authResourceReducer";
import store from "../../store/store";

type AuthFunction = (page: React.ReactNode) => React.ReactNode;

export const useAuth: AuthFunction = (Page: FC) => (() => {

    const [loggedIn, setLoggedIn] = useState(0);
    const router = useRouter();

    const state: any = store.getState();
    const authenticationToken = state.authResourceReducer.token;

    useEffect(() => {
        if (process.browser) {
            const query = parseURL(location.href, true).query;
            let token = authenticationToken;
            if (query["token"]) {
                store.dispatch({ type: AuthResourceReducerAction.AUTH_RESOURCE_WRITE, payload: query["token"] });
                token = query["token"];
                console.log("Updated token");
                location.replace(location.href.split("?")[0]);
                return;
            }

            if (token.length === 0) {
                router.push("/login?redirect_uri=" + encodeURIComponent(location.href));
                return;
            }

            setLoggedIn(1);
        }
    });

    if (loggedIn == 0) {
        return <></>;
    }

    if (loggedIn == 1) {
        return <Page />;
    }
});