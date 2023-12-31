import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import styles from "../styles/sign-in-form.module.css";
import Link from "next/link";
import FullLengthButton from "./button-tag-icons/full-length-button";
import MaterialIcon from "./button-tag-icons/material-icon";

function SignInForm({onClose, switchToSignup}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const { signin } = useContext(AuthContext);

  

  const handleSignIn = async (e) => {
    e.preventDefault();

    const credentials = { email, password};

    await signin(credentials);
  };

  return (
    <div className={styles.wrapper}>
    <div className={styles.container}>
      <button onClick={() => onClose(false)} className={styles.closeButton}>
        <MaterialIcon iconName="close" fontSize="24px" padding="6px" customClass/>
      </button>
      <div className={styles.title}>
        Log In
      </div>
      <p className={styles.disclaimer}>By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.</p>
      
      
      <form onSubmit={handleSignIn}>
        <label className="signin-label margin-bottom-16">
          <div className="d-flex flex-column signin-wrapper">
            <span className={`login-label-name ${email && "show-label"}`}>
              Email 
              <span className="required-asterisk">*</span>
            </span>            
            <input className={`login-input ${email && "show-input"}`}  type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </label>

        <label className="signin-label margin-bottom-16">
          <div className="d-flex flex-column signin-wrapper">
            <span className={`login-label-name ${password && "show-label"}`}>
              Password 
              <span className="required-asterisk">*</span>
            </span>            
            <input className={`login-input ${password && "show-input"}`} type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </label>
        
        {error && <p>{error}</p>}

        <div className={styles.switchPath}>
          New to Reddit? <span style={{color: "#0045ac", cursor: "pointer"}} onClick={() => switchToSignup('signup')}>Sign Up</span>
        </div>


        <div className="login-button" type="submit">
          <FullLengthButton backgroundColor={"#d93a00"} text={"Log In"} color={"white"} customClass={"login-button"}/>
        </div>

      </form>
    </div>
    </div>
  );
}

export default SignInForm;
