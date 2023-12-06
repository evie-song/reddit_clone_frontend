import styles from '../../styles/layout/user-container.module.css';
import Link from 'next/link';
import { useState } from 'react';

export default function UserContainer() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link 
            href="/" 
            className={`${styles.container} d-flex justify-content-between align-items-center ${isHovered? styles.isHovered : styles.notHovered}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='d-flex align-items-center'>
                <i className={`${styles.userIcon} material-icons`}>person_pin</i>
                <div className='font-14 d-flex flex-column'>
                    <span className={styles.userName}>eviesong</span>
                    <span className={styles.userKarma}>1 karma</span>
                </div>
            </div>
            
            <i className='material-icons'>keyboard_arrow_down</i>
        </Link>
    )
}