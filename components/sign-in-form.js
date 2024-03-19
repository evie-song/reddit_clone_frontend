import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import styles from "../styles/sign-in-form.module.css";
import Link from "next/link";
import FullLengthButton from "./button-tag-icons/full-length-button";
import MaterialIcon from "./button-tag-icons/material-icon";
import { UserContext } from "../context/UserContext";
import { ModalContext } from "../context/ModalContext";
import { getUserInfo } from "./utils/app-helper";


function SignInForm({}) {

  const [signinOrSignup, setSigninOrSignup] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signin, register, signinAlert, setSigninAlert } =
    useContext(AuthContext);
  const { setUserInfo } = useContext(UserContext);
  const { handleSigninWindowToggle } = useContext(ModalContext)

  const handleSwitchBtn = (option) => {
    setSigninOrSignup(option)
    setEmail("");
    setPassword("");
    setSigninAlert("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const credentials = { email, password };

    const res = await signin(credentials);

    // if signin is successful, fetch and set the userdata and close the signin modal
    if (res != false) {
      const userInfo = await getUserInfo(res)
      if (userInfo === undefined) {
        debugger 
        console.log("userdata is undefined")
      } else {
        setUserInfo(userInfo)
      }
      
      handleSigninWindowToggle(false)
    }

  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const credentials = {
      name: email,
      email,
      password,
    };

    await register(credentials);
    
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button onClick={()=> handleSigninWindowToggle(false)} className={styles.closeButton}>
          <MaterialIcon
            iconName="close"
            fontSize="24px"
            padding="6px"
            customClass
          />
        </button>
        <div className={styles.title}>
          {signinOrSignup == "signin" ? "Log In" : "Sign Up"}
        </div>
        <p className={styles.disclaimer}>
          By continuing, you agree to our User Agreement and acknowledge that
          you understand the Privacy Policy.
        </p>

        <form>
          <label className="signin-label margin-bottom-16">
            <div className="d-flex flex-column signin-wrapper">
              <span className={`login-label-name ${email && "show-label"}`}>
                Email
                <span className="required-asterisk">*</span>
              </span>
              <input
                className={`login-input ${email && "show-input"}`}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>

          <label className="signin-label margin-bottom-16">
            <div className="d-flex flex-column signin-wrapper">
              <span className={`login-label-name ${password && "show-label"}`}>
                Password
                <span className="required-asterisk">*</span>
              </span>
              <input
                className={`login-input ${password && "show-input"}`}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>

          {signinAlert && <p>{signinAlert}</p>}

          <div className={styles.switchPath}>
            {signinOrSignup == "signin"
              ? "New to Reddit? "
              : "Already a redditor? "}
            <span
              style={{ color: "#0045ac", cursor: "pointer" }}
              onClick={() =>
                handleSwitchBtn(
                  signinOrSignup == "signin" ? "signup" : "signin"
                )
              }
            >
              {signinOrSignup == "signin" ? "Sign Up" : "Log In"}
            </span>
          </div>

          <div
            onClick={signinOrSignup == "signin" ? handleSignIn : handleSignUp}
            className="login-button"
            type="submit"
          >
            <FullLengthButton
              backgroundColor={"#d93a00"}
              text={signinOrSignup == "signin" ? "Log In" : "Sign Up"}
              color={"white"}
              customClass={"login-button"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
