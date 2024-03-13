import Cookies from "js-cookie";
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const getUserInfoFromCookies = () => {
    if (Cookies.get("userInfo")) {
      return JSON.parse(Cookies.get("userInfo"));
    } else return null;
  };

  // get initial data from cookies
  const [savedPosts, setSavedPosts] = useState(
    getUserInfoFromCookies ? getUserInfoFromCookies.savedPostIds : null
  );

  const setUserInfo = (data) => {
    // set states and cookies
    Cookies.set("userInfo", JSON.stringify(data));
    setSavedPosts(data.savedPostIds);
		console.log(data)
    console.log(data.savedPostIds);
  };

  return (
    <UserContext.Provider value={{ savedPosts, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
