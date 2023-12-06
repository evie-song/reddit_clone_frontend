import styles from '../../styles/post-page/single-post-page.module.css';
import PostPageContent from './post-page-content';

export default function SinglePostPage({ post, onUpVoteClick, onDownVoteClick }) {
    return (
        <div className={styles.backgroundLayer}>
            <div className={styles.container}>
                <PostPageContent post={post} onUpVoteClick={onUpVoteClick} onDownVoteClick={onDownVoteClick} />
            </div>
        </div>
    )
}