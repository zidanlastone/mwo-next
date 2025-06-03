"use client"

import { useSession } from 'next-auth/react';
import useSWR, { Fetcher } from 'swr';

export type GenericResponse <T> = {
    status: string;
    message: string;
    data: T;
} 

type ErrorItem = {
    message: string,
    code: string,
    params: any
}

export type ErrorResponse = {
    status: string,
    message: string,
    data: {
        message?: string
        errors?: {
            [key:string]: ErrorItem[]
        }
    }
}

const useFetch = <T, P = {}>(url: string, payload?: P, method: string = 'GET', requireAuth: boolean = true) => {
  const {data: session} = useSession();

  const fetcher: Fetcher<GenericResponse<T> | ErrorResponse> = (url: string) => {

    let fetchOption: any = {
        method
    }

    let headers = new Headers({
        'Content-Type': 'application/json',
    });
    
    console.info('fether',session?.user.token)
    if(requireAuth && session?.user.token){
        headers.append('Authorization', `Bearer ${session?.user.token}`);
    }

    if(payload){
        headers.append('Accept', 'application/json');
        fetchOption['body'] = JSON.stringify(payload);
    }

    fetchOption['headers'] = headers;

    return fetch(url, fetchOption)
    .then(res => res.json())
  }

  return useSWR(url, fetcher)
}

export default useFetch