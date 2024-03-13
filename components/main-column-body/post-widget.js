import HeaderIcon from '../button-tag-icons/header-icon';
import styles from '../../styles/main-column-body/post-widget.module.css';
import MaterialIcon from '../button-tag-icons/material-icon';
import PostTag from '../button-tag-icons/post-tag';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import UpvoteButton from '../button-tag-icons/upvote-button';
import DownvoteButton from '../button-tag-icons/downvote-button';
import UserContainer from '../layout/user-container';
import { AuthContext } from '../../context/AuthContext';
import CalculateDate from "../utils/utils-helper";
import { UserContext } from '../../context/UserContext';


export default function PostWidget({ post, onUpVoteClick, onDownVoteClick, handleSaveClick, handleUnsaveClick }) {
    const { user } = useContext(AuthContext)
    const { savedPosts } = useContext(UserContext)

    const sampleData = {
        channel_name : "r/SantaBarbara",
        post_tag: {
            text: "Discussion",
            text_color: "white",
            background_color: "#0079D3"
        },
        user_name: "u/lsquallhart",
    };

    const handleSaveBtnClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        handleSaveClick();
    }

    const handleUnsaveBtnClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        handleUnsaveClick();
    }

    return (
        <div 
            className={`${styles.container}`}
            // onClick={() => directToPost(post.id)}
        >
            <div className={`${styles.voteContainer} vote-container`}>
                <div className={post.upVoted && "upvoted" }>
                    <UpvoteButton onUpVoteClick={onUpVoteClick} />
                </div>
                <div className={`${styles.voteCount} ${post.upVoted && "upvoted"} ${post.downVoted && "downvoted" }`}>
                    <span>{post.upVote - post.downVote}</span>
                </div>
                <div className={post.downVoted && "downvoted" }>
                    <DownvoteButton onDownVoteClick={onDownVoteClick} />
                </div>
            </div>
            <div className={`${styles.postWrapper}`}>
                <div className={`${styles.postContentWrapper}`}>
                    <div className={`${styles.postHeader} d-flex justify-content-between align-items-center`}>
                        <MaterialIcon iconName="mood" padding="2px" fontSize="16px" />
                        <div className='padding-left-4 d-flex flex-fill d-flex align-items-center'>
                            <div className={styles.channelName}>{post.communityName}</div>
                            <div className='margin-x-4'>&middot;</div>
                            <div className={styles.postInfo}>Posted by {post.username} {CalculateDate(post.createdTime)}</div>
                        </div>
                        <div className={`${styles.joinBtn}`}>
                            <span>Join</span>
                        </div>
                    </div>
                    <div className={`${styles.postTitle}`}>
                        <span>#{post.id} {post.title}</span>
                        <PostTag text={sampleData.post_tag.text} textColor={sampleData.post_tag.text_color} backgroundColor={sampleData.post_tag.background_color}/>
                    </div>
                    <div className={`${styles.postBody} post-body`}>
                        {post && post.content}
                    </div>
                </div>
                <div className={`${styles.postActionContainer}`}>
                    <HeaderIcon marginRight="4px" iconName="mode_comment" linkUrl="" fontSize="20px" padding="4px" addText={`${post.commentCount} Comments`} additionalClass="padding-right-4 padding-y-4"/>
                    <HeaderIcon marginRight="4px" iconName="share" linkUrl="" fontSize="20px" padding="4px" addText="Share" additionalClass="padding-right-4 padding-y-4"/>
                    {post.isSaved && 
                        <div onClick={(event) => handleUnsaveBtnClick(event)}>
                            <HeaderIcon marginRight="4px" iconName="favorite" linkUrl="" fontSize="20px" padding="4px" addText="Unsave" additionalClass="padding-right-4 padding-y-4 color-saved"/>
                        </div>
                    }
                    {!post.isSaved && 
                        <div onClick={(event) => handleSaveBtnClick(event)}>   
                            <HeaderIcon marginRight="4px" iconName="favorite_border" linkUrl="" fontSize="20px" padding="4px" addText="Save" additionalClass="padding-right-4 padding-y-4"/>
                        </div>
                    }
                    <HeaderIcon marginRight="4px" iconName="more_horiz" linkUrl="" fontSize="20px" padding="4px" additionalClass="padding-y-4"/>
                </div>
            </div>
        </div>
    )
} 