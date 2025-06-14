"use client"

import { useSession } from 'next-auth/react';
import useSWR, { Fetcher } from 'swr';
import { useEffect } from 'react';
import { ErrorResponse, GenericResponse } from '@/_types/generic';
import { ACCESS_TOKEN_DURATION } from '../constants';



const useFetch = <T, P = {}>(url: string, payload?: P, method: string = 'GET', requireAuth: boolean = true) => {

    const { data: session, update: updateSession } = useSession();
    // Revalidate SWR when session changes
    useEffect(() => {
        // This effect will trigger a re-render when session changes
        // console.log("useFetchEffect session:", session)
        const revalidateAccessToken = async () => {
            if(session){
                const shouldRefreshToken =  new Date(session?.user.access_token_exp).getTime() < Date.now();
                if(shouldRefreshToken){
                    try {
                        let body = JSON.stringify({refresh_token: session.user.refresh_token})
                        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/refresh`, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body
                        })
                        if(response.ok){
                            let result = await response.json();
                            console.log("refreshed", result)
                            let d = new Date();

                            await updateSession({
                                ...session,
                                user: {
                                    ...session.user,
                                    token: result.data.token,
                                    refresh_token: result.data.refresh_token,
                                    access_token_exp: new Date(d.getTime() + ACCESS_TOKEN_DURATION)
                                }
                            });
                        }
                    } catch(err) {
                        console.log(err)
                    }
                }
            }
        }

        revalidateAccessToken()

    }, [session]);

    const fetcher: Fetcher<GenericResponse<T> | ErrorResponse> = async (url: string) => {
        let fetchOption: any = {
            method
        };

        let headers = new Headers({
            'Content-Type': 'application/json',
        });

        if (requireAuth && session?.user.token) {
            headers.append('Authorization', `Bearer ${session?.user.token}`);
        }

        if(session?.user.company?.company_id){
            headers.append('X-Company', session?.user.company?.company_id.toString())
        }

        if (payload) {
            headers.append('Accept', 'application/json');
            fetchOption['body'] = JSON.stringify(payload);
        }

        fetchOption['headers'] = headers;

        let response = await fetch(url, fetchOption);

        if (response.status === 401 && requireAuth && session?.user.refresh_token) {
            const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ refresh_token: session.user.refresh_token })
            });

            if (refreshRes.ok) {
                const refreshData = await refreshRes.json();
                if (updateSession) {
                    let d = new Date();
                    await updateSession({
                        ...session,
                        user: {
                            ...session.user,
                            token: refreshData.data.token,
                            refresh_token: refreshData.data.refresh_token,
                            access_token_exp: new Date(d.getTime() + ACCESS_TOKEN_DURATION)
                        }
                    });
                }
                headers.set('Authorization', `Bearer ${refreshData.data.token}`);
                fetchOption['headers'] = headers;
                response = await fetch(url, fetchOption);
            } else {
                return {
                    status: '401',
                    message: 'Unauthorized and refresh failed',
                    data: []
                };
            }
        }

        return response.json();
    };

    // Pass session as a dependency to SWR so it re-fetches when session changes
    return useSWR(url, fetcher);
};

export default useFetch