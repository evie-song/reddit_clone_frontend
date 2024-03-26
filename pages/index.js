import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/layout';
import { useState } from 'react';
import IndexBody from '../components/index-body';


export async function getServerSideProps() {
  const res = await fetch("http://localhost:5142/api/post/getall/1");
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
