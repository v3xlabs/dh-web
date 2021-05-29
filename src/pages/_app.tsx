import { AppProps } from "next/dist/next-server/lib/router/router";
import { RecoilRoot } from "recoil";

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}


/// useUser() => UserObject
/// PageComponent gets hit, but decides wether user is authed or not
