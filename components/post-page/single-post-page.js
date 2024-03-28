import { useState, useEffect, useContext } from "react";
import styles from "../../styles/post-page/single-post-page.module.css";
import PostPageContent from "./post-page-content";
import { AuthContext } from "../../context/AuthContext";

export default function SinglePostPage({ post }) {
  const [customPost, setCustomPost] = useState("");
  
  useEffect(() => {

    const getPostData = () => {
        setCustomPost(post);
    };

    getPostData();

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible"; // Reset body overflow
    };
  }, []);

  const updatePostCommentCount = () => {
    console.log('update comment count')
    const newCommentCount = customPost.commentCount + 1
    setCustomPost(prevState => ({
      ...prevState, commentCount : newCommentCount}));
  };


  return (
    <div className={styles.backgroundLayer}>
      <div className={styles.container}>
        { customPost && (
          <PostPageContent
            post={customPost}
            handleCommentCountUpdate={updatePostCommentCount}
          />
        )}
      </div>
    </div>
  );
}
