import HeaderIcon from '../button-tag-icons/header-icon';
import MaterialIcon from '../button-tag-icons/material-icon';
import styles from '../../styles/main-column-body/new-post-widget.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewPostWidget() {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  function handleClick() {
    setIsHovered(false);
    router.push('/posts/submit')
  }

  return (
    <div className={` ${styles.container}`}>
      <MaterialIcon iconName="person_pin" fontSize="38px" padding="" />
      <form className='flex-fill'>
          <input 
            type='text' 
            placeholder='Create Post'
            className={isHovered && styles.inputIsHovered}
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