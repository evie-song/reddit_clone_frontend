import PostSubmit from "../../../components/post-submit";


export async function getServerSideProps({ params }) {
  const res = await fetch("http://localhost:5142/api/Community/Getall");
  const data = await res.json();
  return {
    props: {
      communityData: data,
			communityId: params.community_id
    },
  };
}

export default function Submit({ communityData, communityId }) {
  return <PostSubmit communityData={communityData} communityId={communityId} />;
}
