import { useContext, useEffect, useState } from "react";
import styles from "../../styles/user-page/user-page.module.css";
import PostWidgetContainer from "../main-column-body/post-widget-container";
import HeaderTitle from "./header-title";
import ShortPostWidget from "./short-post-widget";
import UserWidget from "./user-widget";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";

const UserPage = ({ filter, onSigninToggle }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // filter values can be "saved", "upvoted", "downvoted" "posts"
  const [postFilter, setPostFilter] = useState(filter);

  useEffect(() => {
    if (user) {
      const getPostData = async () => {
        const url = "/api/ApplicationUser/" + user.userId + "/" + postFilter;
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        // console.log(data);
        setUserPosts(data);
      };

      getPostData();
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "visible"; // Reset body overflow
      };
    }
  }, []);

  const handleTitleClick = async (title) => {
    const getPostData = async () => {
      const url = "/api/ApplicationUser/" + user.userId + "/" + title;
      const res = await fetch(url, { method: "GET" });
      const data = await res.json();
      // console.log(data);
      setUserPosts(data);
    };
    if (postFilter != title) {
      setIsLoading(true);
      await getPostData();
      setIsLoading(false);
      setPostFilter(title);
      window.history.pushState({}, "", `/user/${user.userId}/${title}`);
    }
  };

  return (
    <div>
      <div className={styles.body}>
        <div className={`${styles.header} user-page-header`}>
          <div className="d-none">
            <HeaderTitle name="Overview" />
          </div>
          <div
            className={styles.headerTitleWrapper}
            onClick={() => {
              handleTitleClick("posts");
            }}
          >
            <HeaderTitle
              name="Posts"
              customClass={postFilter == "posts" ? "header-title-selected" : ""}
            />
          </div>
          <div className="d-none">
            <HeaderTitle name="Comments" />
          </div>
          <div className="d-none">
            <HeaderTitle name="History" />
          </div>
          <div
            className={styles.headerTitleWrapper}
            onClick={() => {
              handleTitleClick("saved");
            }}
          >
            <HeaderTitle
              name="Saved"
              customClass={postFilter == "saved" ? "header-title-selected" : ""}
            />
          </div>
          <div className="d-none">
            <HeaderTitle name="Hidden" />{" "}
          </div>
          <div
            className={styles.headerTitleWrapper}
            onClick={() => {
              handleTitleClick("upvoted");
            }}
          >
            <HeaderTitle
              name="Upvoted"
              customClass={
                postFilter == "upvoted" ? "header-title-selected" : ""
              }
            />
          </div>
          <div
            className={styles.headerTitleWrapper}
            onClick={() => {
              handleTitleClick("downvoted");
            }}
          >
            <HeaderTitle
              name="downvoted"
              customClass={
                postFilter == "downvoted" ? "header-title-selected" : ""
              }
            />
          </div>
        </div>

        <div className={`d-flex justify-content-between ${styles.mainBody}`}>
          <div className={`${styles.postContainer} flex-grow-1`}>
            {isLoading && (
              <div>
                <div class="loading-container">
                  <div class="loading-spinner"></div>
                  <div>&nbsp;&nbsp;&nbsp;fetching posts...</div>
                </div>
              </div>
            )}
            {!isLoading &&
              userPosts.map((post) => {
                return (
                  <div
                    onClick={() => {
                      router.push(`/posts/${post.id}`);
                    }}
                    key={post.id}
                    style={{ marginBottom: "3px" }}
                  >
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
