import styles from "../../styles/comment/comment-display.module.css";
import MaterialIcon from "../button-tag-icons/material-icon";
import HeaderIcon from "../button-tag-icons/header-icon";
import UpvoteButton from "../button-tag-icons/upvote-button";
import DownvoteButton from "../button-tag-icons/downvote-button";
import CalculateDate from "../utils/helper-methods";
import CommentEditor from "./comment-editor";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { handleCommentVote } from "../utils/comment-helper";


const CommentDisplay = ({
  comment,
  isChildComment,
  toggleNewCommentStatus,
  toggleNewCommentActionStatus,
}) => {
  
  const [voteCount, setVoteCount] = useState(comment.totalVoteCount)
  
  const { user } = useContext(AuthContext);
  const [showEditor, setShowEditor] = useState(false);

  const handleCommentSubmit = () => {
    setShowEditor(false);
    toggleNewCommentStatus();
  };

  const handleVoteClick = async (value) => {
    await handleCommentVote(comment.id, value, user.userId );
    toggleNewCommentActionStatus();
  }

  return (
    <div className={isChildComment && styles.childCommentsMargin}>
      <div className={styles.collectionContainer}>
        <div className="d-flex flex-column justify-content-between align-items-center">
          <MaterialIcon iconName="person_pin" fontSize="28px" padding="" />
          <div className="threadline flex-grow-1"></div>
        </div>
        <div className={`flex-grow-1 d-flex flex-column ${styles.body}`}>
          <div className={styles.header}>
            <div className={styles.username}>{comment.username}</div>
            <div className={`margin-x-4 ${styles.date}`}>&middot;</div>
            <div className={styles.date}>
              {CalculateDate(comment.createdAt)}
            </div>
          </div>
          <div className={styles.content}>{comment.content}</div>
          <div className={styles.actionContainer}>
            <div
              className={`d-flex align-items-center justify-content-between ${styles.voteContainer}`}
            >
              <div className={styles.divider}></div>
              <div className={styles.voteBtn}>
                <UpvoteButton onUpVoteClick={() => handleVoteClick(1)}/>

              </div>
              <span className={styles.voteCount}>{comment.totalVoteCount}</span>
              <div className={styles.voteBtn}>
                <DownvoteButton onDownVoteClick={() => handleVoteClick(-1)}/>
              </div>
              <div className={styles.divider}></div>
            </div>
            <div onClick={() => setShowEditor(!showEditor)}>
              <HeaderIcon
                marginRight=""
                iconName="mode_comment"
                linkUrl=""
                fontSize="20px"
                padding="2px"
                addText="Reply"
                additionalClass="padding-right-4 padding-y-4"
              />
            </div>

            <HeaderIcon
              marginRight=""
              iconName="share"
              linkUrl=""
              fontSize="20px"
              padding="2px"
              addText="Share"
              additionalClass="padding-right-4 padding-y-4"
            />
            <HeaderIcon
              marginRight=""
              iconName="favorite_border"
              linkUrl=""
              fontSize="20px"
              padding="2px"
              addText="Save"
              additionalClass="padding-right-4 padding-y-4"
            />
            <HeaderIcon
              marginRight=""
              iconName="more_horiz"
              linkUrl=""
              fontSize="20px"
              padding="2px"
              additionalClass="padding-y-4"
            />
          </div>
          {user && (
            <div
              className={`${!showEditor && "d-none"} ${
                showEditor && styles.subEditor
              }`}
            >
              <CommentEditor
                postId={comment.postId}
                commentId={comment.id}
                toggleNewCommentStatus={handleCommentSubmit}
              />
            </div>
          )}
          <div className={styles.childCommentsContainer}>
            {comment.childComments.length !== 0
              ? comment.childComments.map((cc) => {
                  return (
                    <div style={{ marginLeft: "-12px" }}>
                      <CommentDisplay
                        comment={cc}
                        toggleNewCommentStatus={handleCommentSubmit}
                        handleCommentVote={handleCommentVote}
                        toggleNewCommentActionStatus={toggleNewCommentActionStatus}
                      />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentDisplay;
