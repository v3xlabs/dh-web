import "nprogress/nprogress.css";

import { AppProps } from "next/dist/next-server/lib/router/router";
import Router from "next/router";
import NProgress from "nprogress";
import { FC } from "react";
import { RecoilRoot } from "recoil";

import { Shell } from "../components/shell/Shell";

Router.events.on("routeChangeStart", () => {
    NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {

    return (
        <RecoilRoot>
            <Shell>
                <Component {...pageProps} />
            </Shell>
        </RecoilRoot>
    );
};

export default App;


/// useUser() => UserObject
/// PageComponent gets hit, but decides wether user is authed or not
