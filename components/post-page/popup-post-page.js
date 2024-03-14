import styles from '../../styles/post-page/popup-post-page.module.css';
import PostHeader from './post-header';
import PostPageContent from './post-page-content';

export default function PopupPostPage({ post, onClose, handleSaveClick, handleUnsaveClick, toggleNewCommentStatus, updateVoteCountInCollection}) {
    return (
        <div className={styles.backgroundLayer}>
            <div className={styles.container}>
                <PostHeader updateVoteCountInCollection={updateVoteCountInCollection} post={post} onClose={onClose} />
                <PostPageContent updateVoteCountInCollection={updateVoteCountInCollection} post={post} handleSaveClick={handleSaveClick} handleUnsaveClick={handleUnsaveClick} toggleNewCommentStatus={toggleNewCommentStatus}
/>
            </div>
        </div>
    )
}


