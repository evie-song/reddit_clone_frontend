import styles from "../../styles/user-page/user-widget.module.css";
import FullLengthButton from "../button-tag-icons/full-length-button";
import MaterialIcon from "../button-tag-icons/material-icon";

const UserWidget = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.headerImg}></div>
        <div className={styles.body}>
          <div className={styles.avatarDiv}>
            <img src="/images/avatar.png" alt="avatar img" />
          </div>
          <div className={styles.username}>eviesong</div>
          <div className={styles.usernameSmall}>u/eviesong - 4y</div>

          <FullLengthButton
            text="Style Avatar"
            color="white"
            backgroundColor=""
            border={"none"}
            customClass={"style-avatar-btn margin-bottom-8"}
          />
          <div className="d-flex w-100 margin-bottom-8">
            <div className="w-50">
              <div className={styles.smallTitle}>Karma</div>
              <div className={styles.smallDescWrapper}>
                <MaterialIcon iconName={"star"} fontSize={"16px"} />
                <div className={styles.smallDesc}>1</div>
              </div>
            </div>

            <div className="w-50">
              <div className={styles.smallTitle}>Cake Day</div>
              <div className={styles.smallDescWrapper}>
                <MaterialIcon iconName={"cake"} fontSize={"16px"} />
                <div className={styles.smallDesc}>November 26, 2019</div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="w-100 d-flex">
            <div className={`d-flex ${styles.addLinkBtn}`}>
								<MaterialIcon iconName={"add"} />
								<div>Add Scoial link</div>
            </div>
          </div>

          <FullLengthButton
            text="Create Post"
            color="white"
            backgroundColor="rgb(0 121 211)"
            border={"none"}
            customClass={"margin-bottom-8"}
          />
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
