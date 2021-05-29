import { FC, useEffect } from "react";
import { useUser } from "./useUser";
import { NextSeo, NextSeoProps } from 'next-seo';
import { Shell } from "../shell/shell";
import { useRouter } from 'next/router';

type AuthorizationSettings = {
    SEO: () => NextSeoProps;
    authRequired?: boolean;
};

const defaultAuthorizationSettings: AuthorizationSettings = {
    SEO: () => ({}),
    authRequired: true
};

export const Authorize = (settings: AuthorizationSettings, Page: FC) => {

    settings = Object.assign(defaultAuthorizationSettings, settings || {});

    return () => {
        const router = useRouter();
        const user = useUser();

        if (user == null && settings.authRequired) {
            useEffect(() => {
                router.push('/login');
            });

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