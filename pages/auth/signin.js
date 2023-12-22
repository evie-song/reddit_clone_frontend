import { useContext } from "react";
import SignInForm from "../../components/sign-in-form";
import { useSession, signIn, signOut } from "next-auth/react"
import { AuthContext } from "../../context/AuthContext";
import styles from '../../styles/signin.module.css';
import SignUpForm from "../../components/sign-up-form";


export default function Signin({onClose, toggleSigninOrSignup, signinOrSignup}) {
    const {user} = useContext(AuthContext)

    return (
        <div className={styles.backgroundLayer}>
            <div style={{height: "100%"}}>
                {(signinOrSignup == 'signin') && <SignInForm onClose={onClose} switchToSignup={toggleSigninOrSignup} />}
                {(signinOrSignup == 'signup') && <SignUpForm onClose={onClose} switchToSignup={toggleSigninOrSignup} />}
            </div>
        </div>
    
    )
    
}