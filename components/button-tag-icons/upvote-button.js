import VoteButton from "./vote-button";

export default function UpvoteButton({ onUpVoteClick }) {
    function handleClick(event) {
        event.stopPropagation();
        event.preventDefault();
        onUpVoteClick();
    }

    return(
        <div onClick={(event) => {handleClick(event)}}>
            <VoteButton>
                <span class="glyphicon glyphicon-arrow-up"></span>
            </VoteButton>
        </div>
    )
}