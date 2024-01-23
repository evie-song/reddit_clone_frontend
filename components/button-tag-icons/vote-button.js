import styles from '../../styles/button-tag-icons/header-icon.module.css';
import {useState} from 'react';

export default function VoteButton({ additionalClass, marginRight, children }){
    const [isHovered, setIsHovered] = useState(false)

    return (
        <button
            style={{padding: "2px"}}
            className={` ${styles.headerIconContainer} d-flex align-items-center ${isHovered && styles.headerIconHovered} ${additionalClass}`} 
            onMouseEnter={() => {setIsHovered(true)}}
						onMouseLeave={() => {setIsHovered(false)}}
        >
					{children}
        </button>   
    )
}
