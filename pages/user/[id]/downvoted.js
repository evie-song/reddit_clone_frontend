import Layout from "../../../components/layout/layout";
import Head from "next/head";
import UserPage from "../../../components/user-page/user-page";

export default function Post() {
  return (
    <Layout>
      <Head>
        <title> User </title>
      </Head>
      <UserPage filter={"downvoted"}/>
    </Layout>
  );
}