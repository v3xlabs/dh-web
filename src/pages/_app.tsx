import "nprogress/nprogress.css";

import { AppProps } from "next/dist/next-server/lib/router/router";
import Router from "next/router";
import NProgress from "nprogress";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Shell } from "../components/shell/Shell";
import store, { persistor } from "../store/store";

Router.events.on("routeChangeStart", () => {
    NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {

    return (
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={undefined} persistor={persistor}>
                    <Shell>
                        <Component {...pageProps} />
                    </Shell>
                </PersistGate>
            </Provider>
        </React.StrictMode>
    );
};

export default App;


/// useUser() => UserObject
/// PageComponent gets hit, but decides wether user is authed or not
