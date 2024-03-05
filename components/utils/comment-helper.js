
export const handleCommentVote = async (commentId, voteValue, applicationUserId) => {
	try {
		const payload = { commentId, voteValue, applicationUserId };
		console.log(payload);
		const res = await fetch("/api/CommentVoteRegistration", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		const data = res.json();
		console.log(data);
	} catch (e) {
		console.error("error updating the comment's vote count", e);
	}
};
