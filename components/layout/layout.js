import Head from "next/head";
import styles from "../../styles/layout/layout.module.css";
import NavBar from "./navbar";
import { useContext, useState, useEffect } from "react";
import PopupWindow from "../popup-window";
import Signin from "../../pages/auth/signin";
import { AuthContext } from "../../context/AuthContext";
import React from "react";
import { ModalContext } from "../../context/ModalContext";

const name = "Evie Song";
export const siteTitle = "Reddit Clone";

export default function Layout({ children, home }) {
  const { signinWindowOpen } = useContext(ModalContext);
  const { setShowUserOptions } = useContext(AuthContext);

  const handleClickOutsideUserOption = (event) => {
    if (!event.target.closest(".user-option-window")) {
      setShowUserOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideUserOption);
    return () => {
      document.removeEventListener("click", handleClickOutsideUserOption);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <NavBar />
      <main>
        <PopupWindow isOpen={signinWindowOpen}>
          <Signin />
        </PopupWindow>
        {children}
      </main>
    </div>
  );
}
