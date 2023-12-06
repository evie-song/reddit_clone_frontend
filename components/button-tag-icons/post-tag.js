import styles from '../../styles/button-tag-icons/post-tag.module.css';

export default function PostTag({ text, backgroundColor, textColor }) {
    return(
        <div 
            className={styles.container}
            style={{ backgroundColor: backgroundColor, color: textColor }}
        >
            <span>{text}</span>
        </div>
    )
}