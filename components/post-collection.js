import Link from "next/link";
import PostWidgetContainer from "./main-column-body/post-widget-container";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PopupWindow from "./popup-window";
import PopupPostPage from "./post-page/popup-post-page";
import { useRouter } from "next/navigation";
import { id } from "date-fns/locale";
import PostWidget from "./main-column-body/post-widget";
import { handlePostVote } from "./utils/app-helper";
import { calculateVoteCountAndStatus } from "./utils/utils-helper";

const PostCollection = ({ posts, onSigninToggle }) => {
  const { user } = useContext(AuthContext);
  const [customPosts, setCustomPosts] = useState([]);

	const [voteActionOccurred, setVoteActionOccurred] = useState(false);
  const [saveActionOccurred, setSaveActionOccurred] = useState(false);
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

    if (saveActionOccurred) {
      setSaveActionOccurred(false);
    }
		if (voteActionOccurred) {
      setVoteActionOccurred(false);
    }
		if (newCommentOccurred) {
			setNewCommentOccurred(false);
		}
  }, [user, saveActionOccurred, voteActionOccurred, newCommentOccurred]);

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


  const handleSaveClick = async (id) => {
    if (!user) {
      onSigninToggle(true);
    } else {
      try {
        const payload = { postId: id, applicationUserId: user.userId };
        const res = await fetch("/api/savedpost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        setSaveActionOccurred(true);
      } catch (error) {
        console.error("error saving the post", error);
        throw error;
      }
    }
  };

  const handleUnsaveClick = async (id) => {
    if (!user) {
      onSigninToggle(true);
    } else {
      try {
        const payload = { postId: id, applicationUserId: user.userId };
        const res = await fetch("/api/savedpost", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        setSaveActionOccurred(true);
      } catch (error) {
        console.error("error unsaving the post", error);
        throw error;
      }
    }
  };

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
