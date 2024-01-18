import PostWidget from "./post-widget";
import styles from "../../styles/main-column-body/post-widget-container.module.css"
import { useState } from "react";

export default function PostWidgetContainer({post, onUpVoteClick, onDownVoteClick, handleSaveClick, handleUnsaveClick}) {
    const [isHovered, setIsHovered] = useState(false)

    let containerStyle = {}
    if (isHovered) {
        containerStyle = {borderColor : "#666462"}
    }
    return (
    <div 
        className={`post-widget-wrapper ${styles.container}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={containerStyle}
    >
        <PostWidget post={post} onUpVoteClick={onUpVoteClick} onDownVoteClick={onDownVoteClick} handleSaveClick={handleSaveClick} handleUnsaveClick={handleUnsaveClick}/>
    </div>
    )

}