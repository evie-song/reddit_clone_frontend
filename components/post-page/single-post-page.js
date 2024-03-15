import { useState, useEffect, useContext } from "react";
import styles from "../../styles/post-page/single-post-page.module.css";
import PostPageContent from "./post-page-content";
import { AuthContext } from "../../context/AuthContext";

export default function SinglePostPage({ post, onSigninToggle }) {
  const [customPost, setCustomPost] = useState("");
  const [newCommentOccurred, setNewCommentOccurred] = useState(false);
  const [newCommentActionOccurred, setNewCommentActionOccurred] =
    useState(false);
  const { user } = useContext(AuthContext);
  const postId = post.id;

  const toggleNewCommentStatus = (status) => {
    setNewCommentOccurred(status);
  };

  const toggleNewCommentActionStatus = (status) => {
    setNewCommentActionOccurred(status);
  };

  useEffect(() => {
    const getPostData = async () => {
      if (user) {
        const url = "/api/post/" + postId + "/" + user.userId;
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        setCustomPost(data.data);
      } else {
        setCustomPost(post);
      }
    };

    getPostData();

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible"; // Reset body overflow
    };
  }, []);

  useEffect(() => {
    const getPostData = async () => {
      if (user) {
        const url = "/api/post/" + postId + "/" + user.userId;
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        setCustomPost(data.data);
      } else {
        setCustomPost(post);
      }
    };

    getPostData();

    if (newCommentOccurred) {
      setNewCommentOccurred(false);
    }

    if (newCommentActionOccurred) {
      setNewCommentActionOccurred(false);
    }
  }, [
    user,
    newCommentOccurred,
    newCommentActionOccurred,
  ]);

  return (
    <div className={styles.backgroundLayer}>
      <div className={styles.container}>
        { customPost && (
          <PostPageContent
            post={customPost}
            toggleNewCommentStatus={toggleNewCommentStatus}
            toggleNewCommentActionStatus={toggleNewCommentActionStatus}
          />
        )}
      </div>
    </div>
  );
}
