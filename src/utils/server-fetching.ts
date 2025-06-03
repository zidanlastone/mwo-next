import { auth } from "@/auth";
import { getSession, signOut } from "next-auth/react";

async function fetchWithAuth(input: RequestInfo, init?: RequestInit): Promise<Response> {
    let session = await auth();
    let token = session?.user?.token;

    const doFetch = async (bearerToken?: string) => {
        const headers = new Headers(init?.headers || {});
        if (bearerToken) {
            headers.set("Authorization", `Bearer ${bearerToken}`);
        }
        return fetch(input, { ...init, headers });
    };

    let response = await doFetch(token);

    // If unauthorized, try to refresh session and retry once
    if (response.status === 401) {
        session = await getSession({ triggerEvent: true }); // force refresh
        token = session?.user?.token;
        if (token) {
            response = await doFetch(token);
        }
        // If still unauthorized, sign out
        if (response.status === 401) {
            await signOut({ redirect: false });
        }
    }

    return response;
}

export default fetchWithAuth;