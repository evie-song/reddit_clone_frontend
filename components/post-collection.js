import PostWidgetContainer from "./main-column-body/post-widget-container";
import { useEffect, useState } from "react";
import PopupWindow from "./popup-window";
import PopupPostPage from "./post-page/popup-post-page";
import { useRouter } from "next/navigation";
import PostWidget from "./main-column-body/post-widget";

const PostCollection = ({ posts }) => {
  const [customPosts, setCustomPosts] = useState([]);

  const [postPopupIsOpen, setPostPopupIsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const router = useRouter();

  // update the posts data to show saved and vote status after user is logged in.
  useEffect(() => {

    setCustomPosts(posts);
    
  }, []);

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

  const updateVoteCountInCollection = (id, vote) => {
    
    const updatedPosts = customPosts.map(post => {
      if (post.id == id) {
        return {...post, ["totalVote"]: vote}
      } 
      return post;
    })
    setCustomPosts(updatedPosts)
  }

  const updateCommentCountInCollection = (postId) => {
    
    const updatedPosts = customPosts.map(post => {
      if (post.id === postId) {
        const newCount = post['commentCount'] + 1
        return {...post, ['commentCount']: newCount}
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
          updateCommentCountInCollection={updateCommentCountInCollection}

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
