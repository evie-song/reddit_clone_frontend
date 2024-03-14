import HeaderIcon from "../button-tag-icons/header-icon";
import styles from "../../styles/user-page/short-post-widget.module.css";
import MaterialIcon from "../button-tag-icons/material-icon";
import PostTag from "../button-tag-icons/post-tag";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import UpvoteButton from "../button-tag-icons/upvote-button";
import DownvoteButton from "../button-tag-icons/downvote-button";
import UserContainer from "../layout/user-container";
import { AuthContext } from "../../context/AuthContext";
import {CalculateDate} from "../utils/utils-helper";

const ShortPostWidget = ({
  post,
  onUpVoteClick,
  onDownVoteClick,
  handleSaveClick,
  handleUnsaveClick,
}) => {
  const { user } = useContext(AuthContext);
  const [showContent, setShowContent] = useState(false);

  const sampleData = {
    channel_name: "r/SantaBarbara",
    post_tag: {
      text: "Discussion",
      text_color: "white",
      background_color: "#0079D3",
    },
    user_name: "u/lsquallhart",
  };

  const handleSaveBtnClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    handleSaveClick();
  };

  const handleUnsaveBtnClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    handleUnsaveClick();
  };

  const handleShowContentClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setShowContent(true);
  };

  const handleHideContentClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setShowContent(false);
  };
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.voteContainer} vote-container`}>
        <div className={post.upVoted && "upvoted"}>
          <UpvoteButton onUpVoteClick={onUpVoteClick} />
        </div>
        <div
          className={`${styles.voteCount} ${post.upVoted && "upvoted"} ${
            post.downVoted && "downvoted"
          }`}
        >
          <span>{post.upVote - post.downVote}</span>
        </div>
        <div className={post.downVoted && "downvoted"}>
          <DownvoteButton onDownVoteClick={onDownVoteClick} />
        </div>
      </div>

      <div className={`${styles.postWrapper}`}>
        <div className="d-flex">
          <div className={styles.postImgContainer}>
            <MaterialIcon iconName="library_books" />
          </div>
          <div>
            <div className={`${styles.postContentWrapper}`}>
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
              <div
                className={`${styles.postHeader} d-flex justify-content-between align-items-center`}
              >
                <MaterialIcon iconName="mood" padding="2px" fontSize="16px" />
                <div className="padding-left-4 d-flex flex-fill d-flex align-items-center">
                  <div className={styles.channelName}>{post.communityName}</div>
                  <div className={`${styles.joinBtn}`}>
                    <span>Join</span>
                  </div>
                  <div className="margin-x-4">&middot;</div>
                  <div className={styles.postInfo}>
                    Posted by {post.username} {CalculateDate(post.createdTime)}
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.postActionContainer}`}>
              {!showContent && (
                <div
                  onClick={(event) => {
                    handleShowContentClick(event);
                  }}
                >
                  <HeaderIcon
                    marginRight="4px"
                    iconName="unfold_more"
                    linkUrl=""
                    fontSize="20px"
                    padding="4px"
                    addText=""
                    additionalClass="padding-y-4"
                  />
                </div>
              )}

              {showContent && (
                <div
                  onClick={(event) => {
                    handleHideContentClick(event);
                  }}
                >
                  <HeaderIcon
                    marginRight="4px"
                    iconName="unfold_less"
                    linkUrl=""
                    fontSize="20px"
                    padding="4px"
                    addText=""
                    additionalClass="padding-y-4"
                  />
                </div>
              )}
              <HeaderIcon
                marginRight="4px"
                iconName="mode_comment"
                linkUrl=""
                fontSize="20px"
                padding="4px"
                addText="Comments"
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
              {post.isSaved && (
                <div onClick={(event) => handleUnsaveBtnClick(event)}>
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
              {!post.isSaved && (
                <div onClick={(event) => handleSaveBtnClick(event)}>
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
        {showContent && (
          <div className={`${styles.postBody}`}>{post && post.content}</div>
        )}
      </div>
    </div>
  );
};

export default ShortPostWidget;
