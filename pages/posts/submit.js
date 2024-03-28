import PostForm from "../../components/forms/post-form";
import Layout from "../../components/layout/layout";
import { useRouter } from "next/router";
import UserWidget from "../../components/user-page/user-widget";
import PostSubmit from "../../components/post-submit";

export async function getServerSideProps({ params }) {
  const res = await fetch("http://localhost:5142/api/Community/Getall");
  const data = await res.json();
  return {
    props: {
      communityData: data,
    },
  };
}

export default function Submit({ communityData }) {
  return <PostSubmit communityData={communityData} />;
}
