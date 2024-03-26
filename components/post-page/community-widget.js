import FullLengthButton from "../button-tag-icons/full-length-button";
import styles from "../../styles/post-page/community-widget.module.css";
import MaterialIcon from "../button-tag-icons/material-icon";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import { useRouter } from "next/router";

export default function CommunityWidget({ communityName, communityId }) {
  const { user } = useContext(AuthContext);
  const { handleSigninWindowToggle } = useContext(ModalContext);
  const router = useRouter();

  function handleClick() {
    if (!user) {
      handleSigninWindowToggle(true);
    } else {
      router.push("/posts/submit");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerImg}></div>
      <div className={styles.titleDiv}>
        <MaterialIcon iconName="mood" padding="2px" fontSize="54px" />
        <div className={styles.titleName}>r/{communityName}</div>
      </div>
      <div className={`${styles.description} margin-bottom-8`}>
        r/{communityName} is dedicated to open discussions and sharing
        experiences on {communityName}. Whether you're a seasoned expert or just
        starting out, our goal is to provide a supportive environment where you
        can seek advice, share stories, and connect with others who share your
        interests. From beginner tips to advanced techniques, we're here to help
        you navigate the world of {communityName} and support you every step of
        the way. Join us to engage in thoughtful conversations, ask questions,
        and learn from a diverse community of enthusiasts.
      </div>
      <div className={styles.creationDiv}>
        <MaterialIcon
          iconName="cake"
          padding="2px"
          fontSize="20px"
          customClass="margin-right-8"
        />
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
      <div onClick={handleClick}>
        <FullLengthButton
          text="Create Post"
          color="white"
          backgroundColor="#014980"
          border={"none"}
          customClass={"margin-bottom-8"}
        />
      </div>
      <div className={styles.lineBreak}></div>
      <div
        className={`d-flex justify-content-between align-items-center ${styles.optionsDiv}`}
      >
        <div className={styles.optionTitle}>COMMUNITY OPTIONS</div>
        <MaterialIcon
          iconName="keyboard_arrow_down"
          padding="2px"
          fontSize="16px"
        />
      </div>
    </div>
  );
}
