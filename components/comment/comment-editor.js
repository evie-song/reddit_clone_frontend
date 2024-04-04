import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../styles/comment/comment-editor.module.css";

const CommentEditor = ({ postId, commentId, handleCommentCountUpdate, updateCommentCountInCollection, handleEditorHide }) => {
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
        console.log(updateCommentCountInCollection)
        setContent("");
				setIsFocused(false);
        handleEditorHide?.();
        updateCommentCountInCollection?.(postId)
        handleCommentCountUpdate?.()
      } else {
        console.log("failed");
      }
    } catch (error) {}
  };


  return (
    <div className={`${styles.container} comment-editor-container`}>
      <div className={styles.userDiv}>
        Comment as <span className={styles.username}>{user.username}</span>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={`${styles.wrapper} ${isfocused && "comment-editor-input-border"} comment-editor-wrapper`} >
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
              className={`${styles.contentInput}`}
            ></textarea>
          </div>
          <div className={`${styles.optionContainer} comment-editor-option-container`}>
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
