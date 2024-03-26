import HeaderIcon from '../button-tag-icons/header-icon';
import MaterialIcon from '../button-tag-icons/material-icon';
import styles from '../../styles/main-column-body/new-post-widget.module.css';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';
import { ModalContext } from '../../context/ModalContext';

export default function NewPostWidget({ onSigninToggle }) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const { user } = useContext(AuthContext)
  const { handleSigninWindowToggle } = useContext(ModalContext)


  function handleClick() {
    if (!user) {
      handleSigninWindowToggle(true)
    } else {
      setIsHovered(false);
      router.push('/posts/submit')
    }
  }

  return (
    <div className={` ${styles.container}`}>
      <MaterialIcon iconName="person_pin" fontSize="38px" padding="" />
      <form className='flex-fill'>
          <input 
            type='text' 
            placeholder='Create Post'
            className={isHovered ? styles.inputIsHovered : undefined}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
          />
      </form>
      <div className='d-flex align-items-center'>
          <HeaderIcon iconName="image" iconText="Create Media Post" linkUrl="/" padding="8px" fontSize="20px" />
          <HeaderIcon iconName="insert_link" iconText="" linkUrl="/" padding="8px" fontSize="20px" />
      </div>
    </div>
  )
}