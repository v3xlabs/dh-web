import { FC, useEffect, useState } from "react";
import parseURL from "url-parse";

import { Card } from "../components/card/Card";
import { Static } from "../components/static/static";
import SaferLink from "../library/SaferLink";

const Login: FC = () => {

    const [google_uri, on_change_google_uri] = useState("http://auth.dogehouse.online/google/login");
    const [github_uri, on_change_github_uri] = useState("http://auth.dogehouse.online/github/login");
    const [discord_uri, on_change_discord_uri] = useState("http://auth.dogehouse.online/discord/login");

    useEffect(() => {
        const redirect_uri = parseURL(location.href, true).query["redirect_uri"];
        const handle_change_with_uri = previous => previous + "?redirect_uri=" + encodeURI(redirect_uri);

        if (redirect_uri !== undefined) {
            on_change_discord_uri(handle_change_with_uri);
            on_change_google_uri(handle_change_with_uri);
            on_change_github_uri(handle_change_with_uri);
        }

    }, []);

    return (
        <>
            <Static />
            <div>
                <h1> Login Page </h1>
                <ul>
                    <li>
                        <SaferLink target="internal" href={discord_uri}>
                            Login with Discord
                        </SaferLink>
                    </li>
                    <li>
                        <SaferLink target="internal" href={google_uri}> Login with Google </SaferLink>
                    </li>
                    <li>
                        <SaferLink target="internal" href={github_uri}> Login with Github </SaferLink>
                    </li>
                </ul>
            </div >
        </>
    );
};

export default Login;
