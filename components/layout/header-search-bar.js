import styles from '../../styles/layout/header-search-bar.module.css';
import { useState } from 'react';

export default function HeaderSearchBar(){
    const [ishovered, setIsHovered] = useState(false)

    return (
        <div 
            className={ `${styles.container} ${ishovered? styles.hovered : styles.notHovered}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <form className={ `${styles.searchForm} `}>
                <label>
                    <i className='material-icons'>search</i>
                </label>
                <input className={ `${styles.searchInput} `} type='text' placeholder='Search Reddit'/>
            </form>
        </div>
    );
}
