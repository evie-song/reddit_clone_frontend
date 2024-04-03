import styles from '../../styles/layout/advertise-icon.module.css';
import Link from 'next/link';
import { useState } from 'react';

export default function AdvertiseIcon() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link 
            href="/" 
            className={`${styles.container} d-flex justify-content-between align-items-center ad-icon-container ${isHovered? "is-hovered" : "not-hovered"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <i className='material-icons'>speaker_phone</i>
            <span>Advertise</span>
        </Link>
    )
}