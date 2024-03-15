import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // helper method to retrieve data from Cookies.
  const getUserInfoFromCookies = () => {
    const userInfo = Cookies.get("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  };

  // get initial data from cookies if exist
  const [savedPosts, setSavedPosts] = useState(
    getUserInfoFromCookies() ? getUserInfoFromCookies().savedPostIds : []
  );

  const [votedPosts, setVotedPosts] = useState( 
    getUserInfoFromCookies() ? getUserInfoFromCookies().votedPosts : {}
  );

  const [votedComments, setVotedComments] = useState( 
    getUserInfoFromCookies() ? getUserInfoFromCookies().votedComments : {}
  );

  // set user info for logins
  const setUserInfo = (data) => {
    // set states and cookies
    Cookies.set("userInfo", JSON.stringify(data));
    setSavedPosts(data.savedPostIds);
    setVotedPosts(data.votedPosts);
    setVotedComments(data.votedComments);
  };

  // remove user info for logouts
  const removeUserInfo = (data) => {
    Cookies.remove("userInfo")
    setSavedPosts([])
    setVotedComments({})
    setVotedPosts({})
  }

	// update the votedComments state and the userInfo cookie value
  const updateVotedComments = (commentId, voteStatus) => {
    // Update the state
    setVotedComments((prevVotedComments) => ({
      ...prevVotedComments,
      [commentId]: voteStatus,
    }));

		// Update the value in the cookies
    const cookieValue = JSON.parse(Cookies.get('userInfo'));
    cookieValue.votedComments[commentId] = voteStatus;
    Cookies.set('userInfo', JSON.stringify(cookieValue))
  };

  // update the votedPosts state and the userInfo cookie value
  const updateVotedPosts = (postId, voteStatus) => {
    // Update the state
    setVotedPosts((prevVotedPosts) => ({
      ...prevVotedPosts,
      [postId]: voteStatus,
    }));

		// Update the value in the cookies
    const cookieValue = JSON.parse(Cookies.get('userInfo'));
    cookieValue.votedPosts[postId] = voteStatus;
    Cookies.set('userInfo', JSON.stringify(cookieValue))
  };


  // updated the savedPost state and the userInfo cookie value
  const updateSavedPosts = (postId, isSaving) => {

    // if it is saving, add the id to the state, if not, remove it from the list
      const updatedSavedPosts = isSaving? [...savedPosts, postId] : savedPosts.filter((id => id !== postId))

    setSavedPosts(updatedSavedPosts)

    // Update the value in the cookies
    const cookieValue = JSON.parse(Cookies.get('userInfo'));
    cookieValue.savedPostIds = updatedSavedPosts;
    Cookies.set('userInfo', JSON.stringify(cookieValue));

  }

  return (
    <UserContext.Provider
      value={{
        savedPosts,
        setUserInfo,
        removeUserInfo,
        votedComments,
        votedPosts,
        updateVotedComments,
        updateVotedPosts,
        updateSavedPosts,

      }}
    >
      {children}
    </UserContext.Provider>
  );
};
