import SignInForm from "../../components/sign-in-form";
import { useSession, signIn, signOut } from "next-auth/react"


export default function Signin() {
    const { data: session } = useSession()
    
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </> 
        )
    }
    return (
        <>
        Not signed in <br />
        <buton onClick={() => signIn()}>Sign In</buton>

        </>
        // <SignInForm />
    )
}