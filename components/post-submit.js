import { useRouter } from "next/router";
import PostForm from "./forms/post-form";
import Layout from "./layout/layout";
import UserWidget from "./user-page/user-widget";

export default function PostSubmit({communityData, communityId}) {
    const communities = communityData;

    const router = useRouter();
    // Implement the addPost function to send a POST request to your API
    const addPost = async (newPost) => {
    try {
        const response = await fetch('/api/Post', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        });

        if (response.ok) {
            const data = await response.json()
            const postId = data.data["id"]
            // redirect to new post page
            router.push(`/posts/${postId}`)

        } else {
            // Handle errors (e.g., display error messages)
            console.log("failed")
        }
    } catch (error) {
    // Handle network or other errors
    }
    };

    return (
        <Layout>
            <div className="d-flex justify-content-center">
                <div>
                    <PostForm addPost={addPost} communityData={communities} selectedCommunityId={communityId}/>
                </div>
                <div className="right-column margin-top-28" >
                    <UserWidget />
                </div>
            </div>
        </Layout>
    );
    }