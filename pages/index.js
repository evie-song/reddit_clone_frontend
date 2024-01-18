import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/layout';
import NewPostWidget from '../components/main-column-body/new-post-widget';
import PremiumWidget from '../components/right-column-body/premium-widget';
import HomeWidget from '../components/right-column-body/home-widget';
import PostWidgetContainer from '../components/main-column-body/post-widget-container';
import PopupWindow from '../components/popup-window';
import { id, tr } from 'date-fns/locale';
import { useContext, useReducer, useState } from 'react';
import PopupPostPage from '../components/post-page/popup-post-page';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import Signin from './auth/signin';
import { AuthContext } from '../context/AuthContext';
import PostCollection from '../components/post-collection';
import IndexBody from '../components/index-body';


export async function getServerSideProps() {
  const res = await fetch("http://localhost:5142/api/post/getall");
  const data = await res.json();
  return {
      props: {
          data: data.data,
      },
  }
}

export default function Home({ data }) {

  const [posts, setPosts] = useState(data)

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <IndexBody posts={posts}  />
    </Layout>
  );
}
