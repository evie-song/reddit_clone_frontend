import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "your email"
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            async authorize(credentials){
                // const res = await fetch("api/Authentication/Login",{
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: {"Content-Type": "application/json"}
                // })
                // const user = await res.json().token

                // if (res.result == true && user) {
                //     return user
                // }
                // return null
                
                // below is temporory code. 
                debugger;
                const user = { id: 1, name: 'example' };
                if (user) {
                return Promise.resolve(user);
                } else {
                return Promise.resolve(null);
                }
            }
        })
    ]
}

export default NextAuth(authOptions)