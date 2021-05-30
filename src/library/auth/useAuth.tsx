import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import parseURL from "url-parse";

export const useAuth: (Page: FC<{}>) => React.ReactNode = (Page: FC<{}>) => (() => {

    const [loggedIn, setLoggedIn] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (process.browser) {
            const query = parseURL(location.href, true).query;

            let token = localStorage.getItem('@dh/token') || '';

            if (query['token']) {
                localStorage.setItem('@dh/token', query['token']);
                token = query['token'];
                router.push({
                    query: ' '
                });
            }

            if (token.length == 0) {
                router.push('/login?redirect_uri='+encodeURIComponent(location.href));
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