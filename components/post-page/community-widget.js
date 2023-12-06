import FullLengthButton from "../button-tag-icons/full-length-button";
import styles from '../../styles/post-page/community-widget.module.css';
import MaterialIcon from "../button-tag-icons/material-icon";

export default function CommunityWidget() {

    return (
        <div className={styles.container}>
            <div className={styles.headerImg}>
            </div>
            <div className={styles.titleDiv}>
                <MaterialIcon iconName="mood" padding="2px" fontSize="54px" />
                <div className={styles.titleName}>
                    r/Parenting
                </div>
            </div>
            <div className={`${styles.description} margin-bottom-8`}>
                /r/Parenting is the place to discuss the ins and out as well as ups and downs of child-rearing. From the early stages of pregnancy to when your teenagers are finally ready to leave the nest (even if they don't want to) we're here to help you through this crazy thing called parenting. You can get advice on potty training, talk about breastfeeding, discuss how to get your baby to sleep or ask if that one weird thing your kid does is normal.
            </div>
            <div className={styles.creationDiv}>
                <MaterialIcon iconName="cake" padding="2px" fontSize="20px" customClass="margin-right-8" />
                <span className={styles.creationDate}>Created Mar 24, 2008</span>
            </div>
            <div className={styles.lineBreak}></div>
            <div className={`${styles.infoDiv} d-flex justify-content-between`}>
                <div className="">
                    <div className={styles.infoNum}>5.8m</div>
                    <div className={styles.infoDesc}>Members</div>
                </div>
                <div className="">
                    <div className={`${styles.infoNum} d-flex align-items-center`}>
                        <span className={`${styles.onlineDot} margin-right-4 `}>●</span>
                        3.8k
                    </div>
                    <div className={styles.infoDesc}>Online</div>
                </div>
                <div className="">
                    <div className={styles.infoNum}>Top 1%</div>
                    <div className={styles.infoDesc}>Ranked by Size</div>
                </div>
            </div>
            <div className={styles.lineBreak}></div>
            <FullLengthButton text="Create Post" color="white" backgroundColor="#014980" border={"none"} customClass={"margin-bottom-8"}/>
            <div className={styles.lineBreak}></div>
            <div className={`d-flex justify-content-between align-items-center ${styles.optionsDiv}`}>
                <div className={styles.optionTitle}>COMMUNITY OPTIONS</div>
                <MaterialIcon iconName="keyboard_arrow_down" padding="2px" fontSize="16px" />
            </div>
        </div>
    )
}