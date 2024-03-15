import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const { setSigninAlert } = useContext(AuthContext);

  const [signinWindowOpen, setSigninWindowOpen] = useState(false);

  const handleSigninWindowToggle = (toOpen) => {
    setSigninWindowOpen(toOpen);
    if (toOpen == true) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
      setSigninAlert("");
    }
  };

  return (
    <ModalContext.Provider
      value={{ signinWindowOpen, handleSigninWindowToggle }}
    >
      {children}
    </ModalContext.Provider>
  );
};
