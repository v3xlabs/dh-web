import { FC, useEffect } from "react";
import { useUser } from "./useUser";
import { NextSeo, NextSeoProps } from 'next-seo';
import { Shell } from "../shell/shell";

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
        const user = useUser();

        if (user == null && settings.authRequired) {
            useEffect(() => {
                document.location.replace('/login');
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