import { useContext } from 'react';
import styles from '../../styles/post-page/post-page-content.module.css';
import PostWidget from '../main-column-body/post-widget';
import CommunityWidget from './community-widget';
import { AuthContext } from '../../context/AuthContext';
import CommentEditor from '../comment/comment-editor';
import CommentDisplay from '../comment/comment-display';

export default function PostPageContent({ post, onUpVoteClick, onDownVoteClick, handleSaveClick, handleUnsaveClick, toggleNewCommentStatus }) {

    const {user} = useContext(AuthContext)
    return (
        <div className={styles.body}>
            <div className={styles.mainColumn}>
                <div className={styles.mainColumnBody}>
                    <PostWidget post={post} onUpVoteClick={onUpVoteClick} onDownVoteClick={onDownVoteClick} handleSaveClick={handleSaveClick} handleUnsaveClick={handleUnsaveClick}/>
                    {user && 
                    <div style={{margin: "24px 40px 24px 48px"}}><CommentEditor postId={post.id} toggleNewCommentStatus={()=> toggleNewCommentStatus(true)}/></div>}
                    {post.comments && post.comments.map((comment) => {
                        return (
                            <div style={{margin: "16px 16px 0 10px"}}>
                                <CommentDisplay comment={comment} isChildComment={true} toggleNewCommentStatus={()=> toggleNewCommentStatus(true)}/>
                            </div>

                        )
                    })}
                </div>
            </div>
            <div className={styles.rightColumn}>
                <CommunityWidget />
            </div>
        </div>
    )
}