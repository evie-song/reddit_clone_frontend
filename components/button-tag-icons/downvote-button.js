import VoteButton from "./vote-button";

export default function DownvoteButton({ onDownVoteClick }) {
  function handleClick(event) {
    event.stopPropagation();
    event.preventDefault();
    onDownVoteClick();
  }

  return (
    <div onClick={(event) => handleClick(event)} >
      <VoteButton>
        <span className="downvote-icon glyphicon glyphicon-arrow-down"></span>
      </VoteButton>
    </div>
  );
}
