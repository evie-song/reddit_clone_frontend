import Cookies from "js-cookie";
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // helper method to retrieve data from Cookies.
  const getUserInfoFromCookies = () => {
    const userInfo = Cookies.get("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  };

  // get initial data from cookies if exist
  const [savedPosts, setSavedPosts] = useState(
    () => getUserInfoFromCookies()?.savedPostIds || []
  );

  const [votedPosts, setVotedPosts] = useState(
    getUserInfoFromCookies() ? getUserInfoFromCookies().votedPosts : {}
  );

  const [votedComments, setVotedComments] = useState(
    getUserInfoFromCookies() ? getUserInfoFromCookies().votedComments : {}
  );

  const setUserInfo = (data) => {
    // set states and cookies
    Cookies.set("userInfo", JSON.stringify(data));
    setSavedPosts(data.savedPostIds);
    setVotedPosts(data.votedPosts);
    setVotedComments(data.votedComments);
  };

	// update the votedComments state and the userInfo cookie value. 
  const updateVotedComments = (commentId, voteStatus) => {
    // Update the state
    setVotedComments((prevVotedComments) => ({
      ...prevVotedComments,
      [commentId]: voteStatus,
    }));

		// Update the value in the cookies
		console.log(Cookies.get("userInfo"))
    cookieValue.votedComments[commentId] = voteStatus;
    Cookies.set('userInfo', JSON.stringify(cookieValue))
  };

  return (
    <UserContext.Provider
      value={{
        savedPosts,
        setUserInfo,
        votedComments,
        votedPosts,
        updateVotedComments,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
