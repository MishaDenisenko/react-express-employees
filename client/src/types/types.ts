export type ErrorWithMessage = {
    status: number,
    data: {
        message: string
    }
}

export type User = {
    'id': string,
    'email': string,
    'password': string,
    'name': string
}