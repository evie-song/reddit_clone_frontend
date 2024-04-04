import styles from '../../styles/button-tag-icons/header-icon.module.css';
import Link from 'next/link';
import {useState} from 'react';
import MaterialIcon from './material-icon';

export default function HeaderIcon({ additionalClass, iconName, iconText, linkUrl, addText, fontSize, padding, marginRight }){
    const [isHovered, setIsHovered] = useState(false)
    const [showingDescription, setShowingDescription] = useState(false)

    let descriptionBubble;
    if (showingDescription && iconText) {
        descriptionBubble = 
            <div className={styles.notificationBox}>
                {iconText}
            </div>
    } else {
        descriptionBubble = null;
    }

    return (
        <button
            style={{marginRight: marginRight ? marginRight: 0}} 
            href={linkUrl} 
            className={` ${styles.headerIconContainer} d-flex align-items-center header-icon-container ${isHovered? "is-hovered" : ""} ${additionalClass}`} 
            onMouseEnter={() => {setIsHovered(true); setTimeout(() => {
                setIsHovered((current)=>{
                    if (current) {
                        setShowingDescription(true);
                    }
                    return current
                })          
            },400)}}
            onMouseLeave={() => {setIsHovered(false); setShowingDescription(false)}}
        >
            <MaterialIcon iconName={iconName} fontSize={fontSize} padding={padding} />
            <span style={{fontSize: "12px", marginLeft: "2px"}}>{addText}</span>
            {descriptionBubble}
        </button>   
    )
}
