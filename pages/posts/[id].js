import Layout from '../../components/layout/layout';
import Head from 'next/head';
import SinglePostPage from '../../components/post-page/single-post-page';

export default function Post({ post }) {
  return (<
    Layout>
        <Head>
            <title> {post.title} </title>
        </Head>
        <SinglePostPage post={post}/>
    </Layout>);
}

export async function getServerSideProps({ params }) {
    const res = await fetch(`http://localhost:5142/api/post/${params.id}`);
    const data = await res.json();
    return {
        props: {
            post: data.data,
        },
    }
}
