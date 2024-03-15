import styles from "../../styles/layout/user-container.module.css";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import FullLengthButton from "../button-tag-icons/full-length-button";
import MaterialIcon from "../button-tag-icons/material-icon";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";

export default function UserContainer({ }) {
  const [isHovered, setIsHovered] = useState(false);

  const { user, logout, showUserOptions, setShowUserOptions } = useContext(AuthContext);
  const { removeUserInfo } = useContext(UserContext)

  const { handleSigninWindowToggle } = useContext(ModalContext)

  const handleLogout = (event) => {
    event.stopPropagation();
    event.preventDefault();
    logout();
    removeUserInfo();
  };

  const toggleUserOptionWindow = () => {
    setShowUserOptions(!showUserOptions)
  }

  if (!user) {
    return (
      <div>
        <div onClick={() => handleSigninWindowToggle(true)}>
          <FullLengthButton
            backgroundColor="#D93A00"
            color="white"
            border="none"
            text="Log In"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="user-option-window">
      {/* <Link */}
      <div
        className={`${
          styles.container
        } d-flex justify-content-between align-items-center ${
          isHovered ? styles.isHovered : styles.notHovered
        }`}
        onClick={toggleUserOptionWindow}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="d-flex align-items-center">
          <i className={`${styles.userIcon} material-icons`}>person_pin</i>
          <div className="font-14 d-flex flex-column">
            <span className={styles.userName}>{user.username}</span>
            <span className={styles.userKarma}>1 karma</span>
          </div>
          <i className={`${styles.userIcon} material-icons`}>keyboard_arrow_down</i>

        </div>
        {/* <i className='material-icons'>keyboard_arrow_down</i> */}
      {/* </Link> */}
      </div>
      <div className={`${styles.userOptionContainer} ${!showUserOptions && "d-none"} `}>
        <div className={`${styles.section} ${styles.sectionBorder}`}>
          <div className={`${styles.sectionHeader}`}>
            <div className={`${styles.sectionHeaderIcon}`}>
              <MaterialIcon iconName={"person_pin"} fontSize={"20px"} />
            </div>
            <div className={`${styles.sectionHeaderTitle}`}>My Stuff</div>
          </div>

          <a href={`/user/${user.userId}/posts`}>
            <div className={styles.optionLine}>
              <div className={styles.optionTitle}>Profile</div>
            </div>
          </a>
          <div className={styles.optionLine}>
            <div className={styles.optionTitle}>User Setting</div>
          </div>
        </div>
        <div className={`${styles.section} ${styles.sectionBorder}`}>
          <div className={`${styles.sectionHeader}`}>
            <div className={`${styles.sectionHeaderIcon}`}>
              <MaterialIcon iconName={"remove_red_eye"} fontSize={"20px"} />
            </div>
            <div className={`${styles.sectionHeaderTitle}`}>View Options</div>
          </div>
          <div className={styles.optionLine}>
            <div className={styles.optionTitle}>Dark Mode</div>
          </div>
        </div>

        <div className={styles.section}>
          <div
            onClick={(event) => {
              handleLogout(event);
            }}
            className={styles.optionLine}
          >
            <div className={styles.optionTitle}>Log Out</div>
          </div>
        </div>
        {/* <div
          onClick={(event) => {
            handleLogout(event);
          }}
        >
          <FullLengthButton
            backgroundColor="#D93A00"
            color="white"
            border="none"
            text="Log Out"
          />
        </div> */}
      </div>
    </div>
  );
}
