import { useContext } from 'react';
import styles from '../../styles/post-page/post-page-content.module.css';
import PostWidget from '../main-column-body/post-widget';
import CommunityWidget from './community-widget';
import { AuthContext } from '../../context/AuthContext';
import CommentEditor from '../comment/comment-editor';
import CommentDisplay from '../comment/comment-display';

export default function PostPageContent({ post, onUpVoteClick, onDownVoteClick, handleSaveClick, handleUnsaveClick }) {

    // console.log(post)
    const {user} = useContext(AuthContext)
    return (
        <div className={styles.body}>
            <div className={styles.mainColumn}>
                <div className={styles.mainColumnBody}>
                    <PostWidget post={post} onUpVoteClick={onUpVoteClick} onDownVoteClick={onDownVoteClick} handleSaveClick={handleSaveClick} handleUnsaveClick={handleUnsaveClick}/>
                    {user && <CommentEditor postId={post.id}/>}
                    <CommentDisplay />
                    <CommentDisplay />
                    <CommentDisplay />
                    <CommentDisplay />
                </div>
            </div>
            <div className={styles.rightColumn}>
                <CommunityWidget />
            </div>
        </div>
    )
}