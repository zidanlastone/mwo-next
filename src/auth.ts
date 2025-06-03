import NextAuth, { NextAuthConfig, DefaultSession, User, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {JWT} from 'next-auth/jwt';


export const authConfig: NextAuthConfig = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
    },
    pages: {
        signIn: "/authenticate",
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    placeholder: "johndoe@gmail.com",
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "*****",
                }
            },
            authorize: async (crt: any) => {
                if (crt.email === null || crt.password == null) return null;
                try {
                    let {callbackUrl, ...credentials} = crt 
                    // const user = await UserLoginAuth(crt);
                    const response = await fetch(`${process.env.BACKEND_API_URL}/authenticate`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(credentials)
                    })

                    if(response.ok){
                        const result = await response.json();
                        return {
                            ...result.data.user,
                            token: result.data.token,
                            refresh_token: result.data.refresh_token
                        };
                    }
                    
                    return null

                } catch (error) {
                    console.error('authenticate error', error);
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                return { ...token, ...user };
            }

            if(token.exp){
                const shouldRefreshToken = Math.round((token.exp - 60) - Date.now()) > 3;
                if(shouldRefreshToken){
                    try {
                        let body = JSON.stringify({refresh_token: token.refresh_token})
                        let response = await fetch(`${process.env.BACKEND_API_URL}/refresh`, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body
                        })
                        if(response.ok){
                            let result = await response.json();
                            console.log("refreshed")
                            token.exp = (Date.now()+ 60 * 60)
                            return {
                                ...token,
                                access_token: result.data.token,
                                refresh_token: result.data.refresh_token
                            }
                        }
                    } catch(err) {
                        token.error = "RefreshTokenError";
                        console.error("RefreshTokenError", token)
                    }
                }
            }

            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                // @ts-ignore
                session.user = {
                    name: token?.name,
                    email: token?.email,
                    avatar: token?.avatar,
                    token: token?.token,
                    refresh_token: token?.refresh_token,
                    emailVerified: token?.email_verified_at
                } as Session["user"];

                if(token.error) {
                    session.error = token.error as string
                }
            }
            // console.log('auth:session', session)
            return session;
        },
        authorized: async ({ auth }) => {
            return !!auth;
        },
    },
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);