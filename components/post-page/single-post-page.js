import { useState, useEffect, useContext } from "react";
import styles from "../../styles/post-page/single-post-page.module.css";
import PostPageContent from "./post-page-content";
import { AuthContext } from "../../context/AuthContext";

export default function SinglePostPage({ post, onSigninToggle }) {
  const [customPost, setCustomPost] = useState("");
  const [voteActionOccurred, setVoteActionOccurred] = useState(false);
  const [saveActionOccurred, setSaveActionOccurred] = useState(false);
  const [newCommentOccurred, setNewCommentOccurred] = useState(false);
  const [newCommentActionOccurred, setNewCommentActionOccurred] =
    useState(false);
  const { user } = useContext(AuthContext);
  const postId = post.id;

  const toggleNewCommentStatus = (status) => {
    setNewCommentOccurred(status);
  };

  const toggleNewCommentActionStatus = (status) => {
    setNewCommentActionOccurred(status);
  };

  useEffect(() => {
    const getPostData = async () => {
      if (user) {
        const url = "/api/post/" + postId + "/" + user.userId;
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        console.log(data);
        setCustomPost(data.data);
      } else {
        setCustomPost(post);
        console.log("no user");
      }
    };

    getPostData();

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible"; // Reset body overflow
    };
  }, []);

  useEffect(() => {
    const getPostData = async () => {
      if (user) {
        const url = "/api/post/" + postId + "/" + user.userId;
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        setCustomPost(data.data);
      } else {
        setCustomPost(post);
      }
    };

    getPostData();

    if (saveActionOccurred) {
      setSaveActionOccurred(false);
    }

    if (voteActionOccurred) {
      setVoteActionOccurred(false);
    }

    if (newCommentOccurred) {
      setNewCommentOccurred(false);
    }

    if (newCommentActionOccurred) {
      setNewCommentActionOccurred(false);
    }
  }, [
    user,
    saveActionOccurred,
    voteActionOccurred,
    newCommentOccurred,
    newCommentActionOccurred,
  ]);

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
        setVoteActionOccurred(true);
      } catch (error) {
        console.error("error updating the vote count", error);
        throw error;
      }
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
        setSaveActionOccurred(true);
      } catch (error) {
        console.error("error saving the post", error);
        throw error;
      }
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
        setSaveActionOccurred(true);
      } catch (error) {
        console.error("error unsaving the post", error);
        throw error;
      }
    }
  };

  return (
    <div className={styles.backgroundLayer}>
      <div className={styles.container}>
        <PostPageContent
          post={customPost}
          onUpVoteClick={() => {
            handleVoteClick(customPost.id, 1);
          }}
          onDownVoteClick={() => {
            handleVoteClick(customPost.id, -1);
          }}
          handleSaveClick={() => handleSaveClick(customPost.id)}
          handleUnsaveClick={() => handleUnsaveClick(customPost.id)}
          toggleNewCommentStatus={toggleNewCommentStatus}
          toggleNewCommentActionStatus={toggleNewCommentActionStatus}
        />
      </div>
    </div>
  );
}
