import styles from "../../styles/post-page/post-header.module.css";
import HeaderIcon from "../button-tag-icons/header-icon";
import MaterialIcon from "../button-tag-icons/material-icon";
import PostTag from "../button-tag-icons/post-tag";
import UpvoteButton from "../button-tag-icons/upvote-button";
import DownvoteButton from "../button-tag-icons/downvote-button";

export default function PostHeader({ post, onClose, onUpVoteClick, onDownVoteClick}) {
    return (
        <div className={styles.container}>
            <div className='d-flex align-items-center justify-content-between'>
                <div className={styles.divider}></div>
                <UpvoteButton onUpVoteClick={onUpVoteClick} />
                <span className={styles.voteCount}>{post.upVote - post.downVote}</span>
                <DownvoteButton onDownVoteClick={onDownVoteClick} />
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

