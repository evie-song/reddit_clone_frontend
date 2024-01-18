
import Link from "next/link";
import PostWidgetContainer from "./main-column-body/post-widget-container";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PopupWindow from "./popup-window";
import PopupPostPage from "./post-page/popup-post-page";
import { useRouter } from "next/navigation";
import { id } from "date-fns/locale";

const PostCollection = ( {posts, onSigninToggle } ) => {
	const { user } = useContext(AuthContext)
	const [customPosts, setCustomPosts] = useState([])

	const [saveActionOccurred, setSaveActionOccurred] = useState(false)
	const [postPopupIsOpen, setPostPopupIsOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState(0)
	const router = useRouter()

	// update the posts data to show saved and vote status after user is logged in. 
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

		if (saveActionOccurred) {
			setSaveActionOccurred(false)
		}
	}, [user, saveActionOccurred])

	function handlePostClick(id) {
    setSelectedPostId(id)
    setPostPopupIsOpen(true);
    // when popup window is open, make body page unsrollable.
    document.body.classList.add('popup-open');
		window.history.pushState({}, '', `posts/${id}`);

  }

  function closePostPopup() {
    setPostPopupIsOpen(false);
    // when popup window is closed, make body page srollable again.
    document.body.classList.remove('popup-open');
		window.history.pushState({}, '', '/');
  }

	async function handleUpvoteClick(id) {
    try { 
        const res = await fetch(`/api/Post/upvote/${id}`, {
            method: 'PUT'})
        const data = await res.json();
    } catch (error) {
        console.error('error updating the vote count', error)
        throw error
    }
    
    setCustomPosts((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          const oldVote = item.upVote
          const newVote = oldVote + 1
          return {...item, upVote: newVote };
        }
        return item;
      });
    });
  }

  async function handleDownvoteClick(id) {
    try { 
        const res = await fetch(`/api/Post/downvote/${id}`, {
            method: 'PUT'})
        const data = await res.json();
    } catch (error) {
        console.error('error updating the vote count', error)
        throw error
    }

    setCustomPosts((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          const oldVote = item.downVote
          const newVote = oldVote + 1
          return {...item, downVote: newVote };
        }
        return item;
      });
    });
  }

  const handleSaveClick = async(id) => {
    if (!user) {
      onSigninToggle(true)
    } else {
			try {
				const payload = { postId: id, applicationUserId: user.userId }
				const res = await fetch("/api/savedpost", { 
					method: 'POST',
					headers: { 'Content-Type': 'application/json'},
					body: JSON.stringify(payload)
				})
				const data= await res.json()
				setSaveActionOccurred(true)
			} catch (error) {
				console.error('error updating the vote count', error)
        throw error
			}
    }
  }

	const handleUnsaveClick = async(id) => {
		if (!user) {
      onSigninToggle(true)
    } else {
			try {
				const payload = { postId: id, applicationUserId: user.userId }
				const res = await fetch("/api/savedpost", { 
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json'},
					body: JSON.stringify(payload)
				})
				const data= await res.json()
				setSaveActionOccurred(true)
			} catch (error) {
				console.error('error updating the vote count', error)
        throw error
			}
    }
	}



	return (
		
		<div>
			<PopupWindow isOpen={postPopupIsOpen}>
				<PopupPostPage 
					post={customPosts.find(post => post.id === selectedPostId)} 
					onClose={closePostPopup}
					onUpVoteClick={() => handleUpvoteClick(selectedPostId)}
					onDownVoteClick={() => handleDownvoteClick(selectedPostId)}
					handleSaveClick={() => handleSaveClick(selectedPostId)}
					handleUnsaveClick={() => handleUnsaveClick(selectedPostId)}
				/>
			</PopupWindow>
			<div className='margin-y-8'>
				{customPosts.map((post) => {
					return(
						// <Link href={`?id=${post.id}`} as={`posts/${post.id}`}  >
							<div 
								key={post.id} 
								onClick={() => handlePostClick(post.id)}
							>
								<PostWidgetContainer 
									post={post} 
									onUpVoteClick={() => handleUpvoteClick(post.id)}
									onDownVoteClick={() => handleDownvoteClick(post.id)}
									handleSaveClick={() => handleSaveClick(post.id)}
									handleUnsaveClick={() => handleUnsaveClick(post.id)}
								/>
							</div>
						// </Link>
					)
				})}
			</div>
		</div>
	)
}

export default PostCollection