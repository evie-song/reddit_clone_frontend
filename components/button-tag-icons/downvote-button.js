import HeaderIcon from "./header-icon";

export default function DownvoteButton({ onDownVoteClick }) {
    function handleClick(event) {
        event.stopPropagation();
        event.preventDefault();
        onDownVoteClick();
    }

    return(
        <div onClick={(event) => handleClick(event)}>
            <HeaderIcon iconName="arrow_downward" linkUrl="" fontSize="20px" padding="2px" />
        </div>
    )
}