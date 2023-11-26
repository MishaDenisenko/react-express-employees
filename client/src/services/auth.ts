import { User } from '../types/types';
import { api } from './api';


export type UserData = Omit<User, 'id'>;
export type ResponseUserData = UserData & { token: string };
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ( {
        login: builder.mutation<ResponseUserData, UserData>({
            query: (userData) => ( {
                url: '/user/login',
                method: 'POST',
                body: userData,
            } ),
        }),
        register: builder.mutation<ResponseUserData, UserData>({
            query: (userData) => ( {
                url: '/user/register',
                method: 'POST',
                body: userData,
            } ),
        }),
        current: builder.query<ResponseUserData, void>({
            query: (userData) => ( {
                url: '/user/current',
                method: 'GET',
                body: userData,
            } ),
        }),
    } ),
});

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } = authApi;

export const { endpoints: { login, register, current } } = authApi;