import NewPostWidget from "./main-column-body/new-post-widget";
import PostCollection from "./post-collection";
import PremiumWidget from "./right-column-body/premium-widget";
import HomeWidget from "./right-column-body/home-widget";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const IndexBody = ({ posts, onSigninToggle }) => {

	const { user } = useContext(AuthContext)

	return (
		<div className='canvas'>
			<div className='display-body'>
				<div className='center-column'>
					<NewPostWidget onSigninToggle={onSigninToggle}/>
					<PostCollection posts={posts} onSigninToggle={onSigninToggle} />
				</div>
				<div className='right-column'>
						<PremiumWidget />
					<div>
						<HomeWidget />
					</div>
					<div className="d-none">
						Test Area
						<br/>
						{ user? `${user.username} ${user.userId} ${user.userEmail}` : "User not logged in"}
						<br/>
						Saved Posts:
						<br/>
					</div>
				</div>
			</div>
		</div>
	)
} 

export default IndexBody