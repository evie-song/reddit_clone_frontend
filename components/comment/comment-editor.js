import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../styles/comment/comment-editor.module.css";
import FullLengthButton from "../button-tag-icons/full-length-button";

const CommentEditor = ({ postId, commentId, handleCommentCountUpdate, updateCommentCountInCollection }) => {
	const [isfocused, setIsFocused] = useState(false)
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
	
    const payload = {
      postId,
      baseCommentId: commentId,
      applicationUserId: user.userId,
      content,
    };
    try {
      const response = await fetch("/api/Comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("success");
        setContent("");
				setIsFocused(false);
        updateCommentCountInCollection?.(postId)
        handleCommentCountUpdate?.()
      } else {
        console.log("failed");
      }
    } catch (error) {}
  };


  return (
    <div className={styles.container}>
      <div className={styles.userDiv}>
        Comment as <span className={styles.username}>{user.username}</span>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={`${styles.wrapper} ${isfocused && styles.inputBorder}`} >
          <div>
            <input type="hidden" value={postId} name="postId" />
            {commentId && (
              <input type="hidden" value={commentId} name="commentId" />
            )}
            <input type="hidden" value={user.userId} name="applicationUserId" />
            <textarea
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
              name="content"
              placeholder="What are your thoughts?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className={styles.contentInput}
            ></textarea>
          </div>
          <div className={styles.optionContainer}>
            <div></div>
            <button type="submit" className={styles.submitBtn}>
              Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentEditor;
