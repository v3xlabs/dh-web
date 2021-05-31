import Head from "next/head";
import { FC } from "react";

export const Static: FC = () => {

    return (
        <Head>
            <link rel="icon" type="image/png" sizes="16x16" href="https://cdn.lvk.sh/dogehouse/logo.svg" />
            <link rel="icon" type="image/png" sizes="32x32" href="https://cdn.lvk.sh/dogehouse/logo.svg" />
            <link rel="apple-touch-icon" sizes="180x180" href="https://cdn.lvk.sh/dogehouse/logo.svg" />
            <title>Dogehouse Revived</title>
        </Head>
    );
};
