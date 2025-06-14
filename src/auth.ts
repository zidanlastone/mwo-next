import NextAuth, { NextAuthConfig, DefaultSession, User, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {JWT} from 'next-auth/jwt';
import { ACCESS_TOKEN_DURATION } from "./utils/constants";
import { fetchUserCompany } from "./server/company/user-company";


export const authConfig: NextAuthConfig = {
    session: {
        strategy: "jwt",
        maxAge: 172800, // two days of access token
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
                        let d = new Date();
                        const result = await response.json();
                        let company = null

                        const companies = await fetchUserCompany(result.data.token);

                        if(Array.isArray(companies.data)){
                            company = companies.data[0]
                        }
                    
                        return {
                            ...result.data.user,
                            token: result.data.token,
                            refresh_token: result.data.refresh_token,
                            company: company,
                            access_token_exp: new Date(d.getTime() + ACCESS_TOKEN_DURATION)
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
        jwt: async ({ token, user, trigger, session }) => {
            if (user) {
                return { ...token, ...user };
            }

            if (trigger === "update" && session) {
                session.user.company = session.user.company;
                
                if(!session.user.company){
                    const companies = await fetchUserCompany(session.user.token);
                    if(Array.isArray(companies.data)){
                        session.user.company = companies.data[0]
                    }
                }
                
                token = {...token, user : session, company: session.user.company}

                return token;
            };

            if(token.access_token_exp){
                const shouldRefreshToken = new Date(token.access_token_exp).getTime() < Date.now();
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
                            let d = new Date();
                            return {
                                ...token,
                                pub: token.pub ,
                                access_token: result.data.token,
                                refresh_token: result.data.refresh_token,
                                access_token_exp: new Date(d.getTime() + ACCESS_TOKEN_DURATION)
                            } satisfies JWT
                        }
                    } catch(err) {
                        token.error = "RefreshTokenError";
                        console.error("RefreshTokenError", token)
                        console.log(err)
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
                    emailVerified: token?.email_verified_at,
                    company: token?.company
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