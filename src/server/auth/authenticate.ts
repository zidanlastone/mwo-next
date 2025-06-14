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

export const invalidateSession = async (refresh_token?: string) => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({refresh_token})
    })

    if(res.ok) console.log("logout")


    await signOut({redirectTo: '/'});
}