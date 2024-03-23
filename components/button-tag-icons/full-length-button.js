import styles from '../../styles/button-tag-icons/full-length-button.module.css';
import { useState } from 'react';

export default function FullLengthButton({backgroundColor, color, customClass, border, text}){

    const [isHovered, setIsHovered] = useState(false);

    return (
        <button 
            className={`${customClass} ${styles.wrapper} ${isHovered && styles.isHovered} `}
            style={{backgroundColor: backgroundColor ? backgroundColor : 'initial', color: color ? color : 'initial', border: border ? border : 'initial'}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {text}
        </button>
    )
    
}