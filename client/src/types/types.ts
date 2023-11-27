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

export type Employee = {
    'id': string,
    'firstName': string,
    'lastName': string,
    'age': string
    'address': string
    'userId': string
}