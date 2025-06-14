'use server'

import { UserCompanyRow } from "@/_types/company"
import { GenericResponse } from "@/_types/generic"

export const fetchUserCompany = async (token: string): Promise<GenericResponse<UserCompanyRow[]>> => {
    let response = await fetch(`${process.env.BACKEND_API_URL}/user-companies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    return response.json()
}