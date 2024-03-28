import HeaderIcon from "../button-tag-icons/header-icon";
import styles from "../../styles/main-column-body/post-widget.module.css";
import MaterialIcon from "../button-tag-icons/material-icon";
import PostTag from "../button-tag-icons/post-tag";
import { useState, useEffect, useContext } from "react";
import UpvoteButton from "../button-tag-icons/upvote-button";
import DownvoteButton from "../button-tag-icons/downvote-button";
import { AuthContext } from "../../context/AuthContext";
import {
  CalculateDate,
  calculateVoteCountAndStatus,
  getVoteClass,
} from "../utils/utils-helper";
import { UserContext } from "../../context/UserContext";
import { handlePostSaveAndUnsave, handlePostVote } from "../utils/app-helper";
import { ModalContext } from "../../context/ModalContext";
import he from 'he';

export default function PostWidget({ post, updateVoteCountInCollection }) {
  const [postVoteCount, setPostVoteCount] = useState(post.totalVote);
  const [postCommentCount, setPostCommentCount] = useState(post.commentCount)

  const { user } = useContext(AuthContext);
  const { savedPosts, updateSavedPosts } = useContext(UserContext);
  const { votedPosts, updateVotedPosts } = useContext(UserContext);
  const { handleSigninWindowToggle } = useContext(ModalContext);

  const decodedContent = post.content? he.decode(post.content) : <p></p>

  const sampleData = {
    post_tag: {
      text: "Discussion",
      text_color: "white",
      background_color: "#0079D3",
    },
  };

  // update the local vote count state whenever post updates.
  useEffect(() => {
    setPostVoteCount(post.totalVote);
    setPostCommentCount(post.commentCount);
  }, [post]);

  // post save related var and functions
  const saveStatus = savedPosts.includes(post.id);

  const handleSaveAndUnsaveClick = async (event, isSaving) => {
    event.stopPropagation();
    event.preventDefault();

    if (!user) {
      handleSigninWindowToggle(true);
    } else {
      // update the backend
      await handlePostSaveAndUnsave(post.id, user.userId, isSaving);

      // update the context savedPosts
      updateSavedPosts(post.id, isSaving);
    }
  };

  // vote related var and functions
  const voteStatus = votedPosts[post.id] ? votedPosts[post.id] : 0;
  const voteClass = getVoteClass(voteStatus);

  const handlePostVoteClick = async (value) => {
    // fetch the backend
    await handlePostVote(post.id, value, user.userId);

    // set local vote count
    const { newVote, newStatus } = calculateVoteCountAndStatus(
      postVoteCount,
      voteStatus,
      value
    );
    setPostVoteCount(newVote);

    // update the context votedPosts
    updateVotedPosts(post.id, newStatus);

    // update the customPosts on the parent level to reflect the correct vote count.
    updateVoteCountInCollection?.(post.id, newVote);
  };

  return (
    <div
      className={`${styles.container} post-widget-container`}
      // onClick={() => directToPost(post.id)}
    >
      <div className={`${styles.voteContainer} vote-container ${voteClass}`}>
        <div>
          <UpvoteButton onUpVoteClick={() => handlePostVoteClick(1)} />
        </div>
        <div className={`${styles.voteCount} vote-count`}>
          <span>{postVoteCount}</span>
        </div>
        <div>
          <DownvoteButton onDownVoteClick={() => handlePostVoteClick(-1)} />
        </div>
      </div>
      <div className={`${styles.postWrapper}`}>
        <div className={`${styles.postContentWrapper}`}>
          <div
            className={`${styles.postHeader} d-flex justify-content-between align-items-center`}
          >
            <MaterialIcon iconName="mood" padding="2px" fontSize="16px" />
            <div className="padding-left-4 d-flex flex-fill d-flex align-items-center">
              <div className={styles.channelName}>{post.communityName}</div>
              <div className="margin-x-4">&middot;</div>
              <div className={styles.postInfo}>
                Posted by {post.username} {CalculateDate(post.createdTime)}
              </div>
            </div>
            <div className={`${styles.joinBtn}`}>
              <span>Join</span>
            </div>
          </div>
          <div className={`${styles.postTitle}`}>
            <span>
              #{post.id} {post.title}
            </span>
            <PostTag
              text={sampleData.post_tag.text}
              textColor={sampleData.post_tag.text_color}
              backgroundColor={sampleData.post_tag.background_color}
            />
          </div>
          <div className={`${styles.postBody} post-body`}>
            {post && 
            
            <div dangerouslySetInnerHTML={{ __html: decodedContent }}></div>
            }
          </div>
        </div>
        <div className={`${styles.postActionContainer}`}>
          <HeaderIcon
            marginRight="4px"
            iconName="mode_comment"
            linkUrl=""
            fontSize="20px"
            padding="4px"
            addText={`${postCommentCount} Comments`}
            additionalClass="padding-right-4 padding-y-4"
          />
          <HeaderIcon
            marginRight="4px"
            iconName="share"
            linkUrl=""
            fontSize="20px"
            padding="4px"
            addText="Share"
            additionalClass="padding-right-4 padding-y-4"
          />
          {saveStatus && (
            <div onClick={(event) => handleSaveAndUnsaveClick(event, false)}>
              <HeaderIcon
                marginRight="4px"
                iconName="favorite"
                linkUrl=""
                fontSize="20px"
                padding="4px"
                addText="Unsave"
                additionalClass="padding-right-4 padding-y-4 color-saved"
              />
            </div>
          )}
          {!saveStatus && (
            <div onClick={(event) => handleSaveAndUnsaveClick(event, true)}>
              <HeaderIcon
                marginRight="4px"
                iconName="favorite_border"
                linkUrl=""
                fontSize="20px"
                padding="4px"
                addText="Save"
                additionalClass="padding-right-4 padding-y-4"
              />
            </div>
          )}
          <HeaderIcon
            marginRight="4px"
            iconName="more_horiz"
            linkUrl=""
            fontSize="20px"
            padding="4px"
            additionalClass="padding-y-4"
          />
        </div>
      </div>
    </div>
  );
}
