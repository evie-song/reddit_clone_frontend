import styles from '../../styles/layout/home-dropdown.module.css';
import Link from 'next/link';
import { useState } from 'react';

export default function HomeDropdown() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link 
            href="/" 
            className={ `${styles.container} home-dropdown d-flex justify-content-between align-items-center ${isHovered? "is-hovered" : "not-hovered" }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <i className={`material-icons ${styles.homeIcon}`}>home</i>
            <div className={styles.homeButton}>Home</div>
            <i className={`material-icons ${styles.dropdownIcon}`}>keyboard_arrow_down</i>
        </Link>
    )
}