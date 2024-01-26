import styles from '../../styles/post-page/popup-post-page.module.css';
import PostHeader from './post-header';
import PostPageContent from './post-page-content';

export default function PopupPostPage({ post, onClose, onUpVoteClick, onDownVoteClick, handleSaveClick, handleUnsaveClick, toggleNewCommentStatus}) {
    return (
        <div className={styles.backgroundLayer}>
            <div className={styles.container}>
                <PostHeader post={post} onClose={onClose} onUpVoteClick={onUpVoteClick} onDownVoteClick={onDownVoteClick}/>
                <PostPageContent post={post} onUpVoteClick={onUpVoteClick} onDownVoteClick={onDownVoteClick} handleSaveClick={handleSaveClick} handleUnsaveClick={handleUnsaveClick} toggleNewCommentStatus={toggleNewCommentStatus}
/>
            </div>
        </div>
    )
}


