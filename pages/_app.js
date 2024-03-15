import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";
import { UserProvider } from "../context/UserContext";
import { ModalProvider } from "../context/ModalContext";

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <ModalProvider>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
              ></link>
              <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
              ></link>
            </Head>
            <Component {...pageProps} />
          </ModalProvider>
        </UserProvider>
      </AuthProvider>
    </>
  );
}
