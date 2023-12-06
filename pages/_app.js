import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps: {session, ...pageProps} }) {
    return (
        <>
            <SessionProvider session={session}>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                </Head>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    )
}