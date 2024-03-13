import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/layout/layout.module.css";
import Link from "next/link";
import { ApiError } from "next/dist/server/api-utils";
import NavBar from "./navbar";
import { useContext, useState, useEffect } from "react";
import PopupWindow from "../popup-window";
import Signin from "../../pages/auth/signin";
import Signup from "../../pages/auth/signup";
import { AuthContext } from "../../context/AuthContext";
import React from "react";
import { UserContext } from "../../context/UserContext";
import { getUserInfo } from "../utils/app-helper";

const name = "Evie Song";
export const siteTitle = "Reddit Clone";

export default function Layout({ children, home }) {
  const [loginPopupIsOpen, setLoginPopupIsOpen] = useState(false);
  const [signinOrSignup, setSigninOrSignup] = useState("signin");

  const { setUserInfo } = useContext(UserContext);

  const { signInAlert, setSigninAlert, showUserOptions, setShowUserOptions } =
    useContext(AuthContext);

  const toggleSigninOrSignup = (option) => {
    setSigninOrSignup(option);
  };

  // close or open the signin popup window
  const handleSigninToggle = (isOpen) => {
    setLoginPopupIsOpen(isOpen);
    if (isOpen == true) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
      setSigninAlert("");
    }
  };

  const userInfoData = {};
  const closeSigninAndFetchUserData = async (userId) => {
    handleSigninToggle(false);

    const userInfo = await getUserInfo(userId)
    setUserInfo(userInfo)
  };

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

  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, { onSigninToggle: handleSigninToggle });
  });

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

      <NavBar handleSigninToggle={handleSigninToggle} />
      <main>
        <PopupWindow isOpen={loginPopupIsOpen}>
          <Signin
            onClose={closeSigninAndFetchUserData}
            toggleSigninOrSignup={toggleSigninOrSignup}
            signinOrSignup={signinOrSignup}
          />
        </PopupWindow>
        {childrenWithProps}
      </main>
      {/* {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )} */}
    </div>
  );
}
