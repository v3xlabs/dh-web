import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import parseURL from "url-parse";

import { Button } from "../components/button/Button";
import { Card } from "../components/card/Card";
import SaferLink from "../library/SaferLink";

const Block = styled.div`
    padding: 3rem;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex-direction: column;
    gap: 1rem;
    button {
        flex: 1;
        width: 100%;
        text-align: center;
    }
`;

const Center = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 50%;
`;

const Title = styled.div`
    display: block;
    font-size: 2.4rem;
    line-height: 3.1rem;
    font-weight: 700;
    padding-top: 0.5rem;
    color: ${({ theme }) => theme.palette.primary[100]};
`;

const SubTitle = styled.div`
    display: block;
    font-size: 1.4rem;
    line-height: 3.1rem;
    font-weight: 700;
    padding-top: 0.8rem;
    color: ${({ theme }) => theme.palette.primary[100]};
`;

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
        <div>
            <Center>
                <Card>
                    <Block>
                        <Title>Welcome</Title>
                        <SubTitle>
                            Please choose one of the following platforms for authentication
                        </SubTitle>
                        <SaferLink target="internal" href={discord_uri}>
                            <Button variant="PRIMARY">
                                Discord
                            </Button>
                        </SaferLink>
                        <SaferLink target="internal" href={google_uri}>
                            <Button variant="PRIMARY">
                                Google
                            </Button>
                        </SaferLink>
                        <SaferLink target="internal" href={github_uri}>
                            <Button variant="PRIMARY">
                                Github
                            </Button>
                        </SaferLink>
                    </Block>
                </Card >
            </Center>
        </div>
    );
};

export default Login;
