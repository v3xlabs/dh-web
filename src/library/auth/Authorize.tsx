import { FC, useEffect } from "react";
import { accessTokenState, useUser } from "./useUser";
import { NextSeo, NextSeoProps } from 'next-seo';
import { Shell } from "../../components/shell/Shell";
import { Router, useRouter } from 'next/router';
import { useRecoilState } from "recoil";
import parseURL from 'url-parse';

type AuthorizationSettings = {
    SEO: () => NextSeoProps;
    authRequired?: boolean;
    redirectIfNotAuthed?: boolean;
};

const defaultAuthorizationSettings: AuthorizationSettings = {
    SEO: () => ({}),
    authRequired: true,
    redirectIfNotAuthed: true
};

export const Authorize = (settings: AuthorizationSettings, Page: FC) => {

    settings = Object.assign(defaultAuthorizationSettings, settings || {});

    return () => {
        const router = useRouter();
        const [_, setToken] = useRecoilState(accessTokenState);
        const {user} = useUser();

        useEffect(() => {
            let query = parseURL(location.href, true).query;

            if (query['token']) {
                console.log('New Token Found');
                localStorage.setItem('@dh/token', query['token']);
                setToken(query['token']);
                router.push({ query: ' ', search: ' ' });
            }

            let _token = localStorage.getItem('@dh/token') || '';
            if (_token == '' && settings.redirectIfNotAuthed) {
                router.push('/login');
                return;
            }

        }, [0]);

        if (user == null && settings.authRequired) {
            return (
                <NextSeo {...settings.SEO()} />
            );
        }

        return (
            <Shell>
                <NextSeo {...settings.SEO()} />
                <Page />
            </Shell>
        );
    };
}