import { StoreProvider } from "@/utils/Store";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Auth from "@/utils/Auth";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <SessionProvider session={session}>
            <StoreProvider>
                {Component.auth ? (
                    <Auth>
                        <Component {...pageProps} />
                    </Auth>
                ) : (
                    <Component {...pageProps} />
                )}
            </StoreProvider>
        </SessionProvider>
    );
}
