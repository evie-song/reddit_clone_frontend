import { useEffect, useState } from "react";
import styles from "../../styles/user-page/user-page.module.css";
import PostWidgetContainer from "../main-column-body/post-widget-container";
import HeaderTitle from "./header-title";
import ShortPostWidget from "./short-post-widget";
import UserWidget from "./user-widget";

const UserPage = ({ userData, onSigninToggle }) => {
  const [userPosts, setUserPosts] = useState([]);

  console.log(userData);
  useEffect(() => {
    setUserPosts(userData);
    // console.log(userPosts)
  }, []);

  // console.log(userPosts);
  return (
    <div>
      <div className={styles.body}>
        <div className={styles.header}>
          <HeaderTitle name="Overview" />
          <HeaderTitle name="Posts" />
          <HeaderTitle name="Comments" />
          <HeaderTitle name="History" />
          <HeaderTitle name="Saved" customClass={"header-title-selected"} />
          <HeaderTitle name="Hidden" />
          <HeaderTitle name="Upvoted" />
          <HeaderTitle name="downvoted" />
        </div>

        <div className={`d-flex justify-content-between ${styles.mainBody}`}>
          <div className= {`${styles.postContainer} flex-grow-1`}>
            {userPosts.map((post) => {
              return (
                <div style={{ marginBottom: "3px" }}>
                  <PostWidgetContainer>
                    <ShortPostWidget post={post} />
                  </PostWidgetContainer>
                </div>
              );
            })}
          </div>
          <div className={styles.rightColumn}>
            <UserWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
