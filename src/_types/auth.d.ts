import { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { UserCompanyRow } from "./company"

declare module 'next-auth' {
    interface Session {
        user: {
            name: string,
            email: string,
            avatar: string,
            token?: string,
            refresh_token?: string,
            access_token_exp: Date
            company?: UserCompanyRow
        } & DefaultSession['user'],
        error?: string
    }

    interface User {
        token?: string,
        refresh_token?: string,
        access_token_exp: Date
        company?: UserCompanyRow
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        pub?: string,
        error?: string,
        exp?: number,
        access_token_exp?: Date,
        company?: UserCompanyRow
    }
}
