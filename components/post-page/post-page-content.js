import { useContext, useEffect, useState } from "react";
import styles from "../../styles/post-page/post-page-content.module.css";
import PostWidget from "../main-column-body/post-widget";
import CommunityWidget from "./community-widget";
import { AuthContext } from "../../context/AuthContext";
import CommentEditor from "../comment/comment-editor";
import CommentDisplay from "../comment/comment-display";
import { getCommentsByPost } from "../utils/app-helper";

export default function PostPageContent({
  post,
  updateVoteCountInCollection,
  handleCommentCountUpdate,
  updateCommentCountInCollection,
}) {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState(null);

  const postId = post.id;
  const commentCount = post.commentCount;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCommentsByPost(postId);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();

    // return ()=> {};
  }, [postId, commentCount]);

  return (
    <div className={`${styles.body} post-page-content-body`}>
      <div className={styles.mainColumn}>
        <div className={`${styles.mainColumnBody} post-page-content-main-column-body`}>
          <PostWidget
            updateVoteCountInCollection={updateVoteCountInCollection}
            post={post}
          />
          {user && (
            <div style={{ margin: "24px 40px 24px 48px" }}>
              <CommentEditor
                postId={post.id}
                handleCommentCountUpdate={handleCommentCountUpdate}
                updateCommentCountInCollection={updateCommentCountInCollection}
              />
            </div>
          )}
          <div className="mb-5">
            {comments &&
              comments.map((comment) => {
                return (
                  <div style={{ margin: "16px 16px 0 10px" }} key={comment.id}>
                    <CommentDisplay
                      comment={comment}
                      isChildComment={true}
                      handleCommentCountUpdate={handleCommentCountUpdate}
                      updateCommentCountInCollection={
                        updateCommentCountInCollection
                      }
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <CommunityWidget communityName={post.communityName} communityId={post.communityId} />
      </div>
    </div>
  );
}
