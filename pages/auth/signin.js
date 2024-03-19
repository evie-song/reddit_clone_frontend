import { useContext } from "react";
import SignInForm from "../../components/sign-in-form";
import { useSession, signIn, signOut } from "next-auth/react"
import { AuthContext } from "../../context/AuthContext";
import styles from '../../styles/signin.module.css';
import SignUpForm from "../../components/sign-up-form";


export default function Signin({}) {
    const {user} = useContext(AuthContext)

    return (
        <div className={styles.backgroundLayer}>
            <div style={{height: "100%"}}>
                <SignInForm/>
            </div>
        </div>
    )
}