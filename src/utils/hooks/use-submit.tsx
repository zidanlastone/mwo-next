import { ErrorResponse, GenericResponse } from '@/_types/generic';
import { useSession } from 'next-auth/react';
import { useState } from 'react'
import { ACCESS_TOKEN_DURATION } from '../constants';


interface ReturnUseSubmit <T,P>{
    recentlySuccessful: boolean,
    processing: boolean,
    submitRequest: (p: P, method: 'POST'|'PUT'|'PATCH', newUrl?: string) => Promise<GenericResponse<T> | ErrorResponse>
}

const useSubmit = <T, P = {}>(url: string, requireAuth: boolean = true): ReturnUseSubmit<T, P> => {
    type ReturnResult = GenericResponse<T> | ErrorResponse

    const {data: session, update: updateSession} = useSession();

    const [recentlySuccessful, setRecentlySuccessful] = useState(false);
    const [processing, setProcessing] = useState(false);

    const submitRequest = async (payload: P, method: 'POST'|'PUT'|'PATCH', newUrl?: string): Promise<ReturnResult> => {
        setProcessing(true);

        let fetchOption: any = {
            method
        };

        let headers = new Headers({
            'Content-Type': 'application/json',
        });

        if (requireAuth && session?.user.token) {
            headers.append('Authorization', `Bearer ${session?.user.token}`);
        }

        if (payload) {
            headers.append('Accept', 'application/json');
            fetchOption['body'] = JSON.stringify(payload);
        }

        fetchOption['headers'] = headers;

        let response = newUrl ? await fetch(newUrl, fetchOption): await fetch(url, fetchOption);

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
                    data: {}
                };
            }
        }

        if(response.ok){
            setProcessing(false);
            setRecentlySuccessful(true);
        }

        return response.json() satisfies Promise<ReturnResult>
    };

    return {
        recentlySuccessful,
        processing,
        submitRequest
    }
}

export default useSubmit