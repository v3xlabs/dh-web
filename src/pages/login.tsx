import { FC, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import parseURL from "url-parse";

import { SecondaryButton } from "../components/button/SecondaryButton";
import { Card } from "../components/card/Card";
import SaferLink from "../library/SaferLink";

const Title = styled.div`
    display: block;
    font-size: 2rem;
    line-height: 3.1rem;
    font-weight: 700;
    padding-top: 0.5rem;
    color: ${({ theme }) => theme.palette.primary[100]};
`;

const Block = styled.div`
    padding: 3rem;
`;

const PrimaryAccent = styled.div`
    display: flex;
    color: ${({ theme }) => theme.palette.accent.default};
`;

const Center = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 50%;
`;

const SubTitle = styled.div`
    display: block;
    font-size: 1.2rem;
    line-height: 3.1rem;
    font-weight: 700;
    padding-top: 0.8rem;
    color: ${({ theme }) => theme.palette.primary[100]};
`;

const Login: FC = () => {

    const theme = useTheme();

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
                        <Title> Welcome </Title>

                        <SubTitle>
                            By logging in you accept our Privacy Policy
                            and
                            Terms of Service.
                        </SubTitle>
                    </Block>
                    <Block>
                        <SaferLink target="internal" href={discord_uri}>
                            <SecondaryButton>
                                Log in with Discord
                            </SecondaryButton>
                        </SaferLink>
                        <br/>
                        <SaferLink target="internal" href={google_uri}>
                            <SecondaryButton>
                                Log in with Google
                            </SecondaryButton>
                        </SaferLink>
                        <br />
                        <SaferLink target="internal" href={github_uri}>
                            <SecondaryButton>
                                Log in with Github
                            </SecondaryButton>
                        </SaferLink>
                    </Block>
                </Card >
            </Center>
        </div>
    );
};

export default Login;
