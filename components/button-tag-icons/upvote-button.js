import HeaderIcon from "./header-icon";
import MaterialIcon from "./material-icon";

export default function UpvoteButton({ onUpVoteClick }) {
    function handleClick(event) {
        event.stopPropagation();
        event.preventDefault();
        onUpVoteClick();
    }

    return(
        <div onClick={(event) => {handleClick(event)}}>
            <HeaderIcon iconName="arrow_upward" linkUrl="" fontSize="20px" padding="2px" />
        </div>
    )
}