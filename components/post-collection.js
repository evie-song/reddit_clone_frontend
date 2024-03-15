import PostWidgetContainer from "./main-column-body/post-widget-container";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PopupWindow from "./popup-window";
import PopupPostPage from "./post-page/popup-post-page";
import { useRouter } from "next/navigation";
import PostWidget from "./main-column-body/post-widget";
import { handlePostVote } from "./utils/app-helper";
import { calculateVoteCountAndStatus } from "./utils/utils-helper";

const PostCollection = ({ posts, onSigninToggle }) => {
  const { user } = useContext(AuthContext);
  const [customPosts, setCustomPosts] = useState([]);

  const [postPopupIsOpen, setPostPopupIsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(0);
	const [newCommentOccurred, setNewCommentOccurred] = useState(false);


  const router = useRouter();

	const toggleNewCommentStatus = (status) => {
		setNewCommentOccurred(status);
	}

  // update the posts data to show saved and vote status after user is logged in.
  useEffect(() => {
    const getPostData = async () => {
      if (user) {
        const url = "/api/post/getbyuser/" + user.userId;
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
				// console.log(data.data);
        setCustomPosts(data.data);
      } else {
        setCustomPosts(posts);
      }
    };

    getPostData();

		if (newCommentOccurred) {
			setNewCommentOccurred(false);
		}
  }, [user, newCommentOccurred]);

  function handlePostClick(id) {
    setSelectedPostId(id);
    setPostPopupIsOpen(true);
    // when popup window is open, make body page unsrollable.
    document.body.classList.add("popup-open");
    window.history.pushState({}, "", `posts/${id}`);
  }

  function closePostPopup() {
    setPostPopupIsOpen(false);
    // when popup window is closed, make body page srollable again.
    document.body.classList.remove("popup-open");
    window.history.pushState({}, "", "/");
  }

	// const handleVoteClick = async (id, value) => {
	// 	if (!user) {
  //     onSigninToggle(true);
	// 	}
	// }

  const updateVoteCountInCollection = (id, vote) => {
    
    const updatedPosts = customPosts.map(post => {
      if (post.id == id) {
        return {...post, ["totalVote"]: vote}
      } 
      return post;
    })
    setCustomPosts(updatedPosts)
  }

  return (
    <div>
      <PopupWindow isOpen={postPopupIsOpen}>
        <PopupPostPage
          post={customPosts.find((post) => post.id === selectedPostId)}
          onClose={closePostPopup}
          updateVoteCountInCollection = {updateVoteCountInCollection}
          handleSaveClick={() => handleSaveClick(selectedPostId)}
          handleUnsaveClick={() => handleUnsaveClick(selectedPostId)}
					toggleNewCommentStatus={toggleNewCommentStatus}

        />
      </PopupWindow>
      <div className="margin-y-8">
        {customPosts.map((post) => {
          return (
            // <Link href={`?id=${post.id}`} as={`posts/${post.id}`}  >
            <div style={{margin: "12px 0"}} key={post.id} onClick={() => handlePostClick(post.id)}>
              <PostWidgetContainer>
                <PostWidget
                  updateVoteCountInCollection = {updateVoteCountInCollection}
                  post={post}
                  handleSaveClick={() => handleSaveClick(post.id)}
                  handleUnsaveClick={() => handleUnsaveClick(post.id)}
                />
              </PostWidgetContainer>
            </div>

            // </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PostCollection;
