'use server'

import { signIn, signOut } from "@/auth"

export type AuthenticateDTO = {
    email: string,
    password: string
}

export const actionAuthenticateWithCredentials = async (credentials: AuthenticateDTO) => {
    await signIn('credentials', {
        ...credentials,
        redirectTo: "/dashboard"
    })
}

export const invalidateSession = async () => {
    await signOut({redirectTo: '/'});
}