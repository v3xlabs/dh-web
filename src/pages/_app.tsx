import { AppProps } from "next/dist/next-server/lib/router/router";
import { RecoilRoot } from "recoil";
import NProgress from 'nprogress';
import Router from 'next/router';
import "nprogress/nprogress.css";
import { Suspense } from "react";
import { Shell } from "../components/shell/Shell";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <RecoilRoot>
      <Shell>
        <Component {...pageProps} />
      </Shell>
    </RecoilRoot>
  );
}


/// useUser() => UserObject
/// PageComponent gets hit, but decides wether user is authed or not
