import "nprogress/nprogress.css";

import { AppProps } from "next/dist/next-server/lib/router/router";
import Router from "next/router";
import NProgress from "nprogress";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Shell } from "../components/shell/Shell";
import store, { persistor } from "../store/store";

Router.events.on("routeChangeStart", () => {
    NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider store={store}>
            <PersistGate loading={undefined} persistor={persistor}>
                <Shell>
                    <Component {...pageProps} />
                </Shell>
            </PersistGate>
        </Provider>
    );
}

export default App;