import styles from "../../styles/post-page/post-header.module.css";
import HeaderIcon from "../button-tag-icons/header-icon";
import MaterialIcon from "../button-tag-icons/material-icon";
import PostTag from "../button-tag-icons/post-tag";
import UpvoteButton from "../button-tag-icons/upvote-button";
import DownvoteButton from "../button-tag-icons/downvote-button";
import { UserContext } from '../../context/UserContext';
import { calculateVoteCountAndStatus, getVoteClass } from "../utils/utils-helper";
import { handlePostVote } from '../utils/app-helper';
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function PostHeader({ updateVoteCountInCollection, post, onClose, onUpVoteClick, onDownVoteClick}) {

    const { votedPosts, updateVotedPosts } = useContext(UserContext)
    const {user} = useContext(AuthContext)

    const voteStatus = votedPosts[post.id] ? votedPosts[post.id] : 0
    const voteClass = getVoteClass(voteStatus)

    const handlePostVoteClick = async (value) => {
        // fetch the backend
        await handlePostVote(post.id, value, user.userId)

        // set local vote count
        const {newVote, newStatus} = calculateVoteCountAndStatus(post.totalVote, voteStatus, value)

        // update the context votedPosts
        updateVotedPosts(post.id, newStatus)

        updateVoteCountInCollection?.(post.id, newVote)
    }

    return (
        <div className={styles.container}>
            <div className={`d-flex align-items-center justify-content-between ${voteClass}`}>
                <div className={styles.divider}></div>
                <div >
                    <UpvoteButton onUpVoteClick={()=> handlePostVoteClick(1)} />
                </div>
                <span className={`${styles.voteCount} vote-count`}>{post.totalVote}</span>
                <div >
                    <DownvoteButton onDownVoteClick={() => handlePostVoteClick(-1)} />
                </div>
                <div className={styles.divider}></div>
            </div>
            <div className='d-flex align-items-center flex-grow-1'>
                <MaterialIcon iconName="assignment" fontSize="16px" padding customClass={"margin-right-8"}/>
                <div className={styles.postTitle}>{post.title}</div>
                <PostTag text="Discussion" textColor="white" backgroundColor="#0079d3"/>
            </div>
            <div onClick={onClose} className={`d-flex align-items-center ${styles.closeBtn}`}>
                <MaterialIcon iconName="close" fontSize="24px" padding/>
                <div className={styles.closeName}>Close</div>
            </div>
        </div>
    )
}

