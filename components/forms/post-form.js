import { useContext, useEffect, useState } from 'react';
import styles from '../../styles/forms/post-form.module.css';
import MaterialIcon from '../button-tag-icons/material-icon';
import { userAgent } from 'next/server';
import { AuthContext } from '../../context/AuthContext';

export default function PostForm({ addPost, communityData }) {
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [communityTitle, setCommunityTitle] = useState('Choose a community')
    const [communityId, setCommunityId] = useState('');
    const [showCommunityDropdown, setShowCommunityDropdown] = useState(false)
    const {user} = useContext(AuthContext)

    const communities = communityData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user)

        // Create a new Post object
        const newPost = {
            title,
            content,
            communityId: parseInt(communityId),
            userId: user.userId,
            applicationUserId: user.userId,
        };

        // Send a POST request to your API
        const response = await addPost(newPost);

        // Handle the response as needed (e.g., show success message or errors)
    };

    function handleCummunitySelect(event) {
        setCommunityId(event.currentTarget.getAttribute('data-id'));
        setCommunityTitle(event.currentTarget.getAttribute('data-title'));
        setShowCommunityDropdown(false);
    }

    // close the community dropdown when click outside of dropdown while dropdown is open. 
    useEffect(() => {
        function closeCommunityDropdown(event) {
            if (showCommunityDropdown && !event.target.closest('.community-wrapper')) {
                setShowCommunityDropdown(false)
            }
        }
        document.addEventListener("click", closeCommunityDropdown);
        return () => {
            document.removeEventListener("click", closeCommunityDropdown);
        };
    }, [showCommunityDropdown])

    // if (user) {
        return (
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <div className={styles.headerTitle}>Create a Post {user.userId}</div>
                    <div className={styles.draftBtn}>
                        <div className={styles.draftTitle}>DRAFT</div>
                        <div className={styles.draftCount}>0</div>
                    </div>
                </div>
                <div 
                    className={`${styles.communityDiv} community-wrapper`}
                >
                    <div 
                        className={styles.communityContainer}
                        onClick={() => setShowCommunityDropdown(true)}
                    >
                        <div className={styles.circle}></div>
                        <div className={styles.communityName}>{communityTitle}</div>
                        <i className={`material-icons ${styles.dropdownIcon}`}>keyboard_arrow_down</i>
                    </div>
                    <div 
                        className={`${styles.communityChoiceWrapper} ${showCommunityDropdown && styles.show} ${!showCommunityDropdown && styles.hide}`}
                    >
                        <div className={`d-flex align-items-center ${styles.communityChoiceHeader} margin-bottom-8`}>
                            <div style={{color: "#878a8c"}}>Your communities</div>
                            <div style={{color: "#0079d3"}}>Create New</div>
                        </div>
                        {communities.map((community => {
                            return (
                                <div
                                    data-id={community.id}
                                    data-title={community.title}
                                    onClick={(event) => handleCummunitySelect(event)}
                                >
                                    <div className='d-flex align-items-center margin-bottom-8'>
                                        <MaterialIcon iconName={"face"} fontSize={"28px"} padding={"0 8px 0 0"}/>
                                        <div className=''>
                                            <div className={styles.communityTitle}>{community.title}</div>
                                            <div className={styles.communityMember}>8238404 members</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }))}  
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <div className={`d-flex justify-content-evenly ${styles.formSelect}`}>
                        <div className={`${styles.formType}`} style={{borderWidth: "0 1px 1px 0"}}>
                            <i className={`material-icons ${styles.formTypeIcon}`}>format_list_bulleted	</i>
                            <div className={`${styles.formTypeName}`}>Post</div>
                        </div>
                        <div className={`${styles.formType}`} style={{borderWidth: "0 1px 1px 0"}}>
                            <i className={`material-icons ${styles.formTypeIcon}`}>image</i>
                            <div className={`${styles.formTypeName}`}>Image & Video</div>
                        </div>
                        <div className={`${styles.formType}`} style={{borderWidth: "0 0 1px 0"}}>
                            <i className={`material-icons ${styles.formTypeIcon}`}>insert_link</i>
                            <div className={`${styles.formTypeName}`}>Link</div>
                        </div>
                        <div className={`${styles.formType}`} style={{borderWidth: "0 0 1px 1px"}}>
                            <i className={`material-icons ${styles.formTypeIcon}`}>poll</i>
                            <div className={`${styles.formTypeName}`}>Poll</div>
                        </div>
                    </div>
                    <div className={styles.formWrapper}>
                        <form onSubmit={handleSubmit}>
                            <div className='position-relative d-flex align-items-center margin-bottom-8'>
                                <textarea 
                                    maxLength={300} 
                                    placeholder='Title' 
                                    className={styles.titleInput}
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                >
                                </textarea>
                                <div className={styles.titleInputCount}>0/300</div>
                            </div>

                            <div className='position-relative d-flex align-items-center'>
                                <textarea 
                                    placeholder='Text (opional)' 
                                    className={styles.contentInput}
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                >
                                </textarea>
                            </div>
                            <div className={`d-flex margin-bottom-8 ${styles.tagContainer}`}>
                                <div className={styles.tagBtn}>
                                    <i className={`material-icons ${styles.addTagIcon}`}>add</i>
                                    <div>OC</div>
                                </div>
                                <div className={styles.tagBtn}>
                                    <i className={`material-icons ${styles.addTagIcon}`}>add</i>
                                    <div>Spoiler</div>
                                </div>
                                <div className={styles.tagBtn}>
                                    <i className={`material-icons ${styles.addTagIcon}`}>add</i>
                                    <div>NSFW</div>
                                </div>
                                <div className={styles.tagBtn}>
                                    <i className={`material-icons ${styles.addTagIcon}`}>add</i>
                                    <div>Flair</div>
                                </div>
                            </div>

                            <hr className='line-break'></hr>

                            <div className={styles.summitContainer}>
                                <button className={styles.submitBtn} type="">Save Draft</button>
                                <button className={styles.submitBtn} type="submit">Post</button>
                            </div>
                        </form>
                    </div>
                    <div className={styles.optionContainer}>
                        <div className={`d-flex align-items-center margin-bottom-8`}>
                            <input type='checkbox' className={styles.notificationCheckbox}></input>
                            <div>Send me post reply notifications</div>
                        </div>
                        <div className='d-flex align-items-center'>
                            <div className='margin-right-8'style={{color: "#0079D3"}}>Connect accounts to share your post</div>
                            <i className={`material-icons`} style={{color: "#9da0a2"}}>info_outline</i>
                        </div>
                    </div>

                    
                </div>
            </div>
            
        );
    // } else {
    //     return (
    //         <div>
    //             Not logged in
    //         </div>
    //     )
    // }
}