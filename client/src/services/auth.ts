import { User } from '../types/types';
import { api } from './api';


export type UserData = Omit<User, 'id'>;
export type ResponseUserData = User & { token: string };
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
            query: () => ( {
                url: '/user/current',
                method: 'GET',
            } ),
        }),
    } ),
});

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } = authApi;

export const { endpoints: { login, register, current } } = authApi;