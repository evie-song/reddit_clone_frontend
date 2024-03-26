import { useContext, useEffect, useState } from "react";
import styles from "../../styles/user-page/user-page.module.css";
import PostWidgetContainer from "../main-column-body/post-widget-container";
import HeaderTitle from "./header-title";
import ShortPostWidget from "./short-post-widget";
import UserWidget from "./user-widget";
import { AuthContext } from "../../context/AuthContext";
import { id } from "date-fns/locale";

const UserPage = ({ filter, onSigninToggle }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useContext(AuthContext);

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
    }
  }, [user, postFilter]);

  const handleVoteClick = async (id, value) => {
    if (!user) {
      onSigninToggle(true);
    } else {
      try {
        const payload = {
          postId: id,
          applicationUserId: user.userId,
          voteValue: value,
        };
        const res = await fetch("/api/VoteRegistration/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        // setVoteActionOccurred(true);
      } catch (error) {
        console.error("error updating the vote count", error);
        throw error;
      }

      setUserPosts((prevState) => {
        return prevState.map((item) => {
          if (item.id === id) {
            const prevDownVote = item.downVote;
            const prevDownVoted = item.downVoted;
            const prevUpVote = item.upVote;
            const prevUpVoted = item.upVoted;

            if (value == 1) {
              if (prevDownVoted == false && prevUpVoted == false) {
                return { ...item, upVote: prevUpVote + 1, upVoted: true };
              } else if (prevDownVote == true) {
                return {
                  ...item,
                  downVote: prevDownVote - 1,
                  upVote: prevUpVote + 1,
                  upVoted: true,
                  downVoted: false,
                };
              } else if (prevUpVote == true) {
                return { ...item, upVoted: false, upVote: prevUpVote - 1 };
              }
            } else if (value == -1) {
              if (prevDownVoted == false && prevUpVoted == false) {
                return { ...item, downVote: prevDownVote + 1, downVoted: true };
              } else if (prevUpVote == true) {
                return {
                  ...item,
                  downVote: prevDownVote + 1,
                  upVote: prevUpVote - 1,
                  upVoted: false,
                  downVoted: true,
                };
              } else if (prevDownVote == true) {
                return {
                  ...item,
                  downVoted: false,
                  downVote: prevDownVote - 1,
                };
              }
            }
          }
          return item;
        });
      });
    }
  };

  const handleSaveClick = async (id) => {
    if (!user) {
      onSigninToggle(true);
    } else {
      try {
        const payload = { postId: id, applicationUserId: user.userId };
        const res = await fetch("/api/savedpost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        // setSaveActionOccurred(true);
      } catch (error) {
        console.error("error saving the post", error);
        throw error;
      }

      setUserPosts((prevState) => {
        return prevState.map((item) => {
          if (item.id === id) {
            return { ...item, isSaved: true };
          }
          return item;
        });
      });
    }
  };

  const handleUnsaveClick = async (id) => {
    if (!user) {
      onSigninToggle(true);
    } else {
      try {
        const payload = { postId: id, applicationUserId: user.userId };
        const res = await fetch("/api/savedpost", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        // setSaveActionOccurred(true);
      } catch (error) {
        console.error("error unsaving the post", error);
        throw error;
      }

      setUserPosts((prevState) => {
        return prevState.map((item) => {
          if (item.id === id) {
            return { ...item, isSaved: false };
          }
          return item;
        });
      });
    }
  };

  const handleTitleClick = (title) => {
    if (postFilter != title) {
      setPostFilter(title);
      window.history.pushState({}, "", `/user/${user.userId}/${title}`);
    }
  };

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.header}>
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
            {userPosts.map((post) => {
              return (
                <div key={post.id} style={{ marginBottom: "3px" }}>
                  <PostWidgetContainer>
                    <ShortPostWidget
                      post={post}
                      onUpVoteClick={() => handleVoteClick(post.id, 1)}
                      onDownVoteClick={() => handleVoteClick(post.id, -1)}
                      handleSaveClick={() => handleSaveClick(post.id)}
                      handleUnsaveClick={() => handleUnsaveClick(post.id)}
                    />
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
