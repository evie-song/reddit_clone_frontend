import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [signinAlert, setSigninAlert] = useState(null);
    
    useEffect(() => {
        const userFromCookies = Cookies.get('user')

        if (userFromCookies) {
            setUser(JSON.parse(userFromCookies))
        }
    }, [])

    const signin = async (credentials) => {
        try {
            const res = await fetch('/api/Authentication/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            if (res.ok) {
                const userData = await res.json()
                console.log(userData)
                const user = {username: userData.username, userId: userData.userId, userEmail: userData.email}
                setUser(user)
                Cookies.set('user', JSON.stringify(user))
                return true;
            } else {
                console.log('login failed');
                setSigninAlert('Login faliled');
                return false;
            };
    
        } catch (error) {
            console.log(`Error: ${error}`)
        };
    };

    const register = async (credentials) => {
        try {
            const res = await fetch('/api/Authentication/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })

            if (res.ok) {
                console.log('register success')
                // setUser("User")
            } else {
                console.log('register failed')
            };
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    };
 
    const logout = async () => {
        setUser(null)
        Cookies.remove('user')
        // Make a request to your backend API to invalidate the user session
        // Example: const response = await fetch('/api/logout');
        // Handle the response and reset the user state
        // setUser(null);
    };

    useEffect(() => {

    }, [])


    return (
        <AuthContext.Provider value={{user, signinAlert, signin, logout, register, setSigninAlert}}>
            {children}
        </AuthContext.Provider>
    )
};
