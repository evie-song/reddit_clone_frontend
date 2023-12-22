import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/sign-in-form.module.css";
import Link from "next/link";
import FullLengthButton from "./button-tag-icons/full-length-button";


const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { register } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const credentials = {
      name: e.target.username.value,
      email, password
    };

    await register(credentials);
  };

  return (
    <div className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.title}>
        Sign Up
      </div>
      <p className={styles.disclaimer}>By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.</p>
      
      
      <form onSubmit={handleSignUp}>
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
          Already a redditor? <Link href={"signin"} style={{color: "#0045ac"}}>Log In</Link>
        </div>


        <div className="login-button" type="submit">
          <FullLengthButton backgroundColor={"#d93a00"} text={"Sign Up"} color={"white"} customClass={"login-button"}/>
        </div>

      </form>
    </div>
    </div>
  );
};

export default SignUpForm;
