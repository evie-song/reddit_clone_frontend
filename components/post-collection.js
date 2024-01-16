
import Link from "next/link";
import PostWidgetContainer from "./main-column-body/post-widget-container";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const PostCollection = ( {posts, handlePostClick, handleDownvoteClick, handleUpvoteClick } ) => {
	const { user } = useContext(AuthContext)
	const [customPosts, setCustomPosts] = useState([])

	useEffect(() => {
		const getPostData = async() => {
			if (user) {
				const url = "/api/post/getbyuser/" + user.userId 
				const res = await fetch(url, {method: 'GET'});
				const data = await res.json()
				setCustomPosts(data.data)
			} else {
				setCustomPosts(posts)
			}
		}
		getPostData();
	})

	return (
		<div>
			{customPosts.map((post) => {
				return(
					<Link href={`?id=${post.id}`} as={`posts/${post.id}`}  >
						<div 
							key={post.id} 
							onClick={() => handlePostClick(post.id)}
						>
							<PostWidgetContainer 
								post={post} 
								onUpVoteClick={() => handleUpvoteClick(post.id)}
								onDownVoteClick={() => handleDownvoteClick(post.id)}
							/>
						</div>
					</Link>
				)
			})}
		</div>
	)
}

export default PostCollection