import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import parseURL from "url-parse";

import { accessTokenState } from "./useUser";

type AuthFunction = (page: React.ReactNode) => React.ReactNode;

export const useAuth: AuthFunction = (Page: FC) => (() => {
    const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

    const [loggedIn, setLoggedIn] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (process.browser) {
            const query = parseURL(location.href, true).query;

            let accessTokenData = accessToken;

            if (query["token"]) {
                setAccessToken({ token: query["token"] });

                accessTokenData = { token: query["token"] };
                console.log("Updated token");
                location.replace(location.href.split("?")[0]);
                return;
            }

            if (accessTokenData.token.length === 0) {
                router.push("/login?redirect_uri=" + encodeURIComponent(location.href));
                return;
            }

            setLoggedIn(1);
        }
    }, [loggedIn, accessToken]);

    if (loggedIn == 0) {
        return <></>;
    }

    if (loggedIn == 1) {
        return <Page />;
    }
});