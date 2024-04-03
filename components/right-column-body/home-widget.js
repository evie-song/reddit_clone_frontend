import FullLengthButton from "../button-tag-icons/full-length-button";
import styles from "../../styles/right-column-body/home-widget.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";
import { useRouter } from "next/router";

export default function HomeWidget() {
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
    <div className={`${styles.container} home-widget-container`}>
      <div className={styles.headerImg}></div>
      <div className={styles.titleDiv}>
        <div className={styles.titleImg}></div>
        <div className={styles.titleName}>Home</div>
      </div>
      <div className={`${styles.description} margin-bottom-8`}>
        Your personal Reddit frontpage. Come here to check in with your favorite
        communities.
      </div>
      <div className={`${styles.lineBreak} break-line`}></div>
      <div onClick={handleClick}>
        {" "}
        <FullLengthButton
          text="Create Post"
          color="white"
          backgroundColor="rgb(0 121 211)"
          border={"none"}
          customClass={"margin-bottom-8"}
        />
      </div>
      <FullLengthButton
        text="Create Community"
        color="rgb(0 121 211)"
        backgroundColor="white"
        border={"1px solid rgb(0 121 211)"}
      />
    </div>
  );
}
