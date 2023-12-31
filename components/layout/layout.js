import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/layout/layout.module.css';
import Link from 'next/link';
import { ApiError } from 'next/dist/server/api-utils';
import NavBar from './navbar';
import { useState } from 'react';
import PopupWindow from '../popup-window';
import Signin from '../../pages/auth/signin';
import Signup from '../../pages/auth/signup'; 

const name = 'Evie Song';
export const siteTitle = 'Reddit Clone';

export default function Layout({ children, home }) {
  const [loginPopupIsOpen, setLoginPopupIsOpen] = useState(false)
  const [signinOrSignup, setSigninOrSignup] = useState('signin')

  const  toggleSigninOrSignup = (option) => {
    setSigninOrSignup(option);
  };

  const handleSigninToggle = (isOpen) => {
    setLoginPopupIsOpen(isOpen);
    if (isOpen == true) {
      document.body.classList.add('popup-open');
    } else {
      document.body.classList.remove('popup-open');
    }
  };

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
              siteTitle,
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <NavBar handleSigninToggle={handleSigninToggle}/>
      <main>
        <PopupWindow isOpen={loginPopupIsOpen}>
          <Signin onClose={handleSigninToggle} toggleSigninOrSignup={toggleSigninOrSignup} signinOrSignup={signinOrSignup} />
        </PopupWindow>
        {children}
      </main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}


