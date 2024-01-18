import Layout from '../../components/layout/layout';
import Head from 'next/head';
import SinglePostPage from '../../components/post-page/single-post-page';
import UserPage from '../../components/user-page';


export default function Post({ userData }) {
  return (<
    Layout>
        <Head>
            <title> User </title>
        </Head>
				<UserPage	userData={userData} />
    </Layout>);
		
}

export async function getServerSideProps({ params }) {
    const res = await fetch(`http://localhost:5142/api/savedpost/${params.id}`);
    const data = await res.json();
    return {
        props: {
            userData: data,
        },
    }
}
