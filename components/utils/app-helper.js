export const handleCommentVote = async (
  commentId,
  voteValue,
  applicationUserId
) => {
  try {
    const payload = { commentId, voteValue, applicationUserId };
    const res = await fetch("/api/CommentVoteRegistration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      // currently return a list of comments from this user
      const data = await res.json();
      // console.log(data);
    }
  } catch (e) {
    console.error("error updating the comment's vote count", e);
  }
};

export const handlePostVote = async (
  postId,
  voteValue,
  applicationUserId
) => {
  try {
    const payload = { postId, voteValue, applicationUserId };
    const res = await fetch("/api/VoteRegistration/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
    }
  } catch (error) {
    console.error("error updating the vote count", error);
    throw error;
  }
};

export const getUserInfo = async (userId) => {
  const res = await fetch(`/api/ApplicationUser/userInfo/${userId}`);
  if (res.ok) {
    const userInfo = await res.json();
    return userInfo;
  }
};
