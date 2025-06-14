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