import { signIn } from 'next-auth/react';

function SignInForm() {
const handleSignIn = async (e) => {
    e.preventDefault();

    const credentials = {
    username: e.target.username.value,
    password: e.target.password.value,
    };

    debugger;
    // Call the signIn function
    const result = await signIn('credentials', { ...credentials, redirect: false });
    debugger
    // Handle the result (success or error)
    if (user) {
    console.error('Sign-in failed:', result.error);
    } else {
    console.log('Sign-in successful');
    }
};

return (
    <form onSubmit={handleSignIn}>
    <label>
        Username:
        <input type="text" name="username" />
    </label>
    <br />
    <label>
        Password:
        <input type="password" name="password" />
    </label>
    <br />
    <button type="submit">Sign In</button>
    </form>
);
}

export default SignInForm;