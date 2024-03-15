import VoteButton from "./vote-button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";

export default function DownvoteButton({ onDownVoteClick }) {
  const { handleSigninWindowToggle } = useContext(ModalContext);
  const { user } = useContext(AuthContext);

  function handleClick(event) {
    event.stopPropagation();
    event.preventDefault();
    if (!user) {
      handleSigninWindowToggle(true);
    } else {
      onDownVoteClick();
    }
  }

  return (
    <div onClick={(event) => handleClick(event)}>
      <VoteButton>
        <span className="downvote-icon glyphicon glyphicon-arrow-down"></span>
      </VoteButton>
    </div>
  );
}
