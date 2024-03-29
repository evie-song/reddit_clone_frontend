import Layout from "../../../components/layout/layout";
import Head from "next/head";
import UserPage from "../../../components/user-page/user-page";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import NoPermission from "../../../components/no-permission";

export default function UserSaved() {

  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (<div></div>)
  }

  if (!user) {
    return (<NoPermission />)
  }

  return (
    <Layout>
      <Head>
        <title> User page</title>
      </Head>
      <UserPage filter={"saved"} />
    </Layout>
  );
}
