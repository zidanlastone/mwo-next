import { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module 'next-auth' {
    interface Session {
        user: {
            name: string,
            email: string,
            avatar: string,
            token?: string,
            refresh_token?: string
        } & DefaultSession['user'],
        error?: string
    }

    interface User {
        token?: string,
        refresh__token?: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        pub: string,
        error?: string,
        exp?: number
    }
}
