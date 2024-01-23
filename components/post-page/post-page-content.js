import styles from '../../styles/post-page/post-page-content.module.css';
import PostWidget from '../main-column-body/post-widget';
import CommunityWidget from './community-widget';

export default function PostPageContent({ post, onUpVoteClick, onDownVoteClick, handleSaveClick, handleUnsaveClick }) {
    return (
        <div className={styles.body}>
            <div className={styles.mainColumn}>
                <div className={styles.mainColumnBody}>
                    <PostWidget post={post} onUpVoteClick={onUpVoteClick} onDownVoteClick={onDownVoteClick} handleSaveClick={handleSaveClick} handleUnsaveClick={handleUnsaveClick}/>
                </div>
            </div>
            <div className={styles.rightColumn}>
                <CommunityWidget />
            </div>
        </div>
    )
}