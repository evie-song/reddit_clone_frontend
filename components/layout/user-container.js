import styles from '../../styles/layout/user-container.module.css';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import FullLengthButton from '../button-tag-icons/full-length-button';

export default function UserContainer({handleSigninToggle}) {
    const [isHovered, setIsHovered] = useState(false);

    const {user, logout} = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }

    if (!user) {
        return (
            <div>
                <div onClick={() => handleSigninToggle(true)} >
                    <FullLengthButton
                        backgroundColor="#D93A00" 
                        color="white" 
                        border="none" 
                        text="Log In" />
                </div>
            </div>
        )
    }

    return (
        <div>
            <Link 
                href="/" 
                className={`${styles.container} d-flex justify-content-between align-items-center ${isHovered? styles.isHovered : styles.notHovered}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className='d-flex align-items-center'>
                    <i className={`${styles.userIcon} material-icons`}>person_pin</i>
                    <div className='font-14 d-flex flex-column'>
                        <span className={styles.userName}>{user.username}</span>
                        <span className={styles.userKarma}>1 karma</span>
                    </div>
                </div>
                {/* <i className='material-icons'>keyboard_arrow_down</i> */}
                <div onClick={handleLogout}>
                    <FullLengthButton 
                        backgroundColor="#D93A00" 
                        color="white" 
                        border="none" 
                        text="Log Out"
                    />
                </div>
            </Link>
        </div>
        
        
    )
}