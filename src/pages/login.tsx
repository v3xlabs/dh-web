import { NextSeo } from "next-seo";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import parseURL from "url-parse";

import { Button } from "../components/button/Button";
import { Card } from "../components/card/Card";
import { Logo } from "../components/logo/Logo";
import SaferLink from "../library/SaferLink";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    @media(max-width: 600px) {
        background: ${({ theme }) => theme.palette.primary[800]};
    }
    *::-moz-selection { background: ${({ theme }) => theme.palette.primary[500]};; color: white;}
    *::selection { background: ${({ theme }) => theme.palette.primary[500]};; color: white;}
`;

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
    @media(max-width: 600px) {
        aling-items: center;
        justify-content: center;
        height: 100%;
    }
`;

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex: 1;
    @media(max-width: 600px) {
        justify-content: stretch;
        align-items: stretch;
    }
`;

const CardWrapper = styled.div`
    height: auto;
    width: 400px;
    max-width: calc(100% - 4rem);
    @media(max-width: 600px) {
        width: 100%;
        max-width: 100%;
        height: 100%;
        > * {
            height: 100%;
            justify-content: center;
            align-items: center;
        }
    }
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

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: auto;
    color: ${({ theme }) => theme.palette.primary[100]};
    align-items: center;
    flex-wrap: wrap;
    padding: 0 6rem 3rem 6rem;
    *::-moz-selection { background: ${({ theme }) => theme.palette.primary[500]};; color: white;}
    *::selection { background: ${({ theme }) => theme.palette.primary[500]};; color: white;}
`;

const Icon = styled.div`
`;

const LinkIcon = styled.div`
    color: ${({ theme }) => theme.palette.primary[300]};
    display: flex;
    text-decoration: none;
    a, a:visited {
        text-decoration: none;
        color: ${({ theme }) => theme.palette.primary[300]};
    }
    a:hover{
        color: ${({ theme }) => theme.palette.primary[200]};
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    font-size: 1.4rem;
`;

const ButtonInner = styled.div`
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

const Right = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
`;

const Login: FC = () => {
    const [github_uri, on_change_github_uri] = useState("https://auth.dogehouse.online/github/login");
    const [google_uri, on_change_google_uri] = useState("https://auth.dogehouse.online/google/login");
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
        <Wrapper>
            <NextSeo
                defaultTitle="Dogehouse Revived"
                title="Login | Dogehouse Revived"
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
            <Center>
                <CardWrapper>
                    <Card>
                        <Block>
                            <Title>Welcome</Title>
                            <SubTitle>
                                Please choose one of the following platforms for authentication
                            </SubTitle>
                            <ButtonWrapper>
                                <SaferLink target="internal" href={discord_uri}>
                                    <Button variant="PRIMARY">
                                        <ButtonInner>
                                            <svg
                                                width={20}
                                                height={20}
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg"

                                            >
                                                <path d="M6.3138 6.7124C5.85738 6.7124 5.4978 7.1124 5.4978 7.60082C5.4978 8.08756 5.8658 8.48924 6.3138 8.48924C6.76938 8.48924 7.12896 8.08756 7.12896 7.60082C7.13822 7.11156 6.76938 6.7124 6.3138 6.7124ZM9.23422 6.7124C8.7778 6.7124 8.41822 7.1124 8.41822 7.60082C8.41822 8.08756 8.78622 8.48924 9.23422 8.48924C9.6898 8.48924 10.0494 8.08756 10.0494 7.60082C10.0485 7.11156 9.6898 6.7124 9.23422 6.7124Z" />
                                                <path d="M13.1224 0H2.40155C2.18568 0.000552227 1.97204 0.0436171 1.77282 0.126736C1.57359 0.209855 1.39269 0.331399 1.24044 0.48443C1.08819 0.637462 0.967579 0.818982 0.885482 1.01863C0.803385 1.21827 0.761415 1.43213 0.761968 1.648V12.464C0.761968 13.376 1.49797 14.112 2.40155 14.112H11.4735L11.0483 12.6307L12.0731 13.5832L13.0407 14.4792L14.762 16V1.648C14.7625 1.43213 14.7205 1.21827 14.6385 1.01863C14.5564 0.818982 14.4357 0.637462 14.2835 0.48443C14.1312 0.331399 13.9503 0.209855 13.7511 0.126736C13.5519 0.0436171 13.3383 0.000552227 13.1224 0V0ZM10.0335 10.448C10.0335 10.448 9.74555 10.1044 9.50639 9.79874C10.554 9.50232 10.954 8.84716 10.954 8.84716C10.6255 9.06274 10.314 9.216 10.0335 9.32042C9.01265 9.74768 7.88839 9.86427 6.80155 9.65558C6.39995 9.57669 6.00644 9.46112 5.62597 9.31032C5.42531 9.23409 5.23029 9.14376 5.04239 9.04C5.01797 9.02232 4.99439 9.01558 4.97081 8.99958C4.9582 8.99358 4.947 8.98497 4.93797 8.97432C4.79397 8.89516 4.71397 8.83958 4.71397 8.83958C4.71397 8.83958 5.09797 9.47958 6.11439 9.78358C5.87439 10.0867 5.57797 10.448 5.57797 10.448C3.81039 10.3916 3.13923 9.232 3.13923 9.232C3.13923 6.656 4.29123 4.56842 4.29123 4.56842C5.44323 3.70358 6.53881 3.728 6.53881 3.728L6.61881 3.824C5.17881 4.24084 4.51439 4.87242 4.51439 4.87242C4.51439 4.87242 4.69123 4.77642 4.98681 4.64084C5.84239 4.26526 6.52197 4.16084 6.80239 4.13642C6.85039 4.12884 6.89081 4.12042 6.93881 4.12042C8.32593 3.93349 9.73642 4.19711 10.9624 4.87242C10.9624 4.87242 10.33 4.27284 8.96997 3.85684L9.08197 3.72884C9.08197 3.72884 10.1784 3.70442 11.3295 4.56926C11.3295 4.56926 12.4815 6.65684 12.4815 9.23284C12.4815 9.232 11.802 10.3916 10.0335 10.448V10.448Z" />
                                            </svg>
                                            Login with Discord
                                        </ButtonInner>
                                    </Button>
                                </SaferLink>
                                <SaferLink target="internal" href={google_uri}>
                                    <Button variant="PRIMARY">
                                        <ButtonInner>
                                            <svg height={16} width={16} aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="svg-inline--fa fa-google fa-w-16 fa-2x"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                            Login with Google
                                        </ButtonInner>
                                    </Button>
                                </SaferLink>
                                <SaferLink target="internal" href={github_uri}>
                                    <Button variant="PRIMARY">
                                        <ButtonInner>
                                            <svg
                                                width={20}
                                                height={20}
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg"

                                            >
                                                <g clipPath="url(#clip0)">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M8 0C12.4184 0 16 3.67194 16 8.20234C16 11.8255 13.7104 14.8992 10.5336 15.9848C10.128 16.0656 9.984 15.8094 9.984 15.591C9.984 15.3206 9.9936 14.4374 9.9936 13.3398C9.9936 12.575 9.7376 12.0759 9.4504 11.8215C11.232 11.6183 13.104 10.9246 13.104 7.77422C13.104 6.87822 12.7936 6.14706 12.28 5.57266C12.3632 5.36546 12.6376 4.53116 12.2016 3.40156C12.2016 3.40156 11.5312 3.18178 10.004 4.24258C9.35149 4.0607 8.67738 3.96769 8 3.96641C7.32314 3.96763 6.64956 4.06064 5.9976 4.24258C4.4688 3.18178 3.7968 3.40156 3.7968 3.40156C3.3624 4.53116 3.6368 5.36546 3.7192 5.57266C3.208 6.14706 2.8952 6.87822 2.8952 7.77422C2.8952 10.9166 4.7632 11.6209 6.54 11.8281C6.3112 12.0329 6.104 12.3942 6.032 12.9246C5.576 13.1342 4.4176 13.497 3.704 12.2434C3.704 12.2434 3.2808 11.4553 2.4776 11.3977C2.4776 11.3977 1.6976 11.3873 2.4232 11.8961C2.4232 11.8961 2.9472 12.1481 3.3112 13.0961C3.3112 13.0961 3.7808 14.5601 6.0064 14.0641C6.0104 14.7497 6.0176 15.3958 6.0176 15.591C6.0176 15.8078 5.8704 16.0615 5.4712 15.9855C2.292 14.9015 0 11.8263 0 8.20234C0 3.67194 3.5824 0 8 0"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0">
                                                        <rect width="16" height="16" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            Login with Github
                                        </ButtonInner>
                                    </Button>
                                </SaferLink>
                            </ButtonWrapper>
                        </Block>
                    </Card >
                </CardWrapper>
            </Center>
            <Footer>

                <Icon><Logo /></Icon>


                <Right>
                    <LinkIcon><a href="">Privacy policy</a></LinkIcon>
                    <LinkIcon><a href="https://github.com/dogehousetv/web/issues">Report a bug</a></LinkIcon>

                    <LinkIcon>
                        <SaferLink target="external" href="https://github.com/dogehousetv">
                            <svg
                                width={20}
                                height={20}
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"

                            >
                                <g clipPath="url(#clip0)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M8 0C12.4184 0 16 3.67194 16 8.20234C16 11.8255 13.7104 14.8992 10.5336 15.9848C10.128 16.0656 9.984 15.8094 9.984 15.591C9.984 15.3206 9.9936 14.4374 9.9936 13.3398C9.9936 12.575 9.7376 12.0759 9.4504 11.8215C11.232 11.6183 13.104 10.9246 13.104 7.77422C13.104 6.87822 12.7936 6.14706 12.28 5.57266C12.3632 5.36546 12.6376 4.53116 12.2016 3.40156C12.2016 3.40156 11.5312 3.18178 10.004 4.24258C9.35149 4.0607 8.67738 3.96769 8 3.96641C7.32314 3.96763 6.64956 4.06064 5.9976 4.24258C4.4688 3.18178 3.7968 3.40156 3.7968 3.40156C3.3624 4.53116 3.6368 5.36546 3.7192 5.57266C3.208 6.14706 2.8952 6.87822 2.8952 7.77422C2.8952 10.9166 4.7632 11.6209 6.54 11.8281C6.3112 12.0329 6.104 12.3942 6.032 12.9246C5.576 13.1342 4.4176 13.497 3.704 12.2434C3.704 12.2434 3.2808 11.4553 2.4776 11.3977C2.4776 11.3977 1.6976 11.3873 2.4232 11.8961C2.4232 11.8961 2.9472 12.1481 3.3112 13.0961C3.3112 13.0961 3.7808 14.5601 6.0064 14.0641C6.0104 14.7497 6.0176 15.3958 6.0176 15.591C6.0176 15.8078 5.8704 16.0615 5.4712 15.9855C2.292 14.9015 0 11.8263 0 8.20234C0 3.67194 3.5824 0 8 0"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="16" height="16" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </SaferLink>
                    </LinkIcon>
                    <LinkIcon>
                        <SaferLink target="external" href="https://devtalk.dev">
                            <svg
                                width={20}
                                height={20}
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"

                            >
                                <path d="M6.3138 6.7124C5.85738 6.7124 5.4978 7.1124 5.4978 7.60082C5.4978 8.08756 5.8658 8.48924 6.3138 8.48924C6.76938 8.48924 7.12896 8.08756 7.12896 7.60082C7.13822 7.11156 6.76938 6.7124 6.3138 6.7124ZM9.23422 6.7124C8.7778 6.7124 8.41822 7.1124 8.41822 7.60082C8.41822 8.08756 8.78622 8.48924 9.23422 8.48924C9.6898 8.48924 10.0494 8.08756 10.0494 7.60082C10.0485 7.11156 9.6898 6.7124 9.23422 6.7124Z" />
                                <path d="M13.1224 0H2.40155C2.18568 0.000552227 1.97204 0.0436171 1.77282 0.126736C1.57359 0.209855 1.39269 0.331399 1.24044 0.48443C1.08819 0.637462 0.967579 0.818982 0.885482 1.01863C0.803385 1.21827 0.761415 1.43213 0.761968 1.648V12.464C0.761968 13.376 1.49797 14.112 2.40155 14.112H11.4735L11.0483 12.6307L12.0731 13.5832L13.0407 14.4792L14.762 16V1.648C14.7625 1.43213 14.7205 1.21827 14.6385 1.01863C14.5564 0.818982 14.4357 0.637462 14.2835 0.48443C14.1312 0.331399 13.9503 0.209855 13.7511 0.126736C13.5519 0.0436171 13.3383 0.000552227 13.1224 0V0ZM10.0335 10.448C10.0335 10.448 9.74555 10.1044 9.50639 9.79874C10.554 9.50232 10.954 8.84716 10.954 8.84716C10.6255 9.06274 10.314 9.216 10.0335 9.32042C9.01265 9.74768 7.88839 9.86427 6.80155 9.65558C6.39995 9.57669 6.00644 9.46112 5.62597 9.31032C5.42531 9.23409 5.23029 9.14376 5.04239 9.04C5.01797 9.02232 4.99439 9.01558 4.97081 8.99958C4.9582 8.99358 4.947 8.98497 4.93797 8.97432C4.79397 8.89516 4.71397 8.83958 4.71397 8.83958C4.71397 8.83958 5.09797 9.47958 6.11439 9.78358C5.87439 10.0867 5.57797 10.448 5.57797 10.448C3.81039 10.3916 3.13923 9.232 3.13923 9.232C3.13923 6.656 4.29123 4.56842 4.29123 4.56842C5.44323 3.70358 6.53881 3.728 6.53881 3.728L6.61881 3.824C5.17881 4.24084 4.51439 4.87242 4.51439 4.87242C4.51439 4.87242 4.69123 4.77642 4.98681 4.64084C5.84239 4.26526 6.52197 4.16084 6.80239 4.13642C6.85039 4.12884 6.89081 4.12042 6.93881 4.12042C8.32593 3.93349 9.73642 4.19711 10.9624 4.87242C10.9624 4.87242 10.33 4.27284 8.96997 3.85684L9.08197 3.72884C9.08197 3.72884 10.1784 3.70442 11.3295 4.56926C11.3295 4.56926 12.4815 6.65684 12.4815 9.23284C12.4815 9.232 11.802 10.3916 10.0335 10.448V10.448Z" />
                            </svg>
                        </SaferLink>
                    </LinkIcon>
                </Right>
            </Footer>
        </Wrapper>
    );
};



export default Login;
