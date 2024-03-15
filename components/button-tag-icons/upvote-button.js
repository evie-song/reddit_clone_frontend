import { useContext } from "react";
import VoteButton from "./vote-button";
import { AuthContext } from "../../context/AuthContext";
import { ModalContext } from "../../context/ModalContext";

export default function UpvoteButton({ onUpVoteClick }) {

    const { handleSigninWindowToggle } = useContext(ModalContext);
    const { user } = useContext(AuthContext)

    function handleClick(event) {
        event.stopPropagation();
        event.preventDefault();
        if (!user) {
            handleSigninWindowToggle(true)
        } else {
            onUpVoteClick();
        }
    }

    return(
        <div onClick={(event) => {handleClick(event)}}>
            <VoteButton>
                <span className="upvote-icon glyphicon glyphicon-arrow-up"></span>
            </VoteButton>
        </div>
    )
}