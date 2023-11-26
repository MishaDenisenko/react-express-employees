import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

import { BASE_URL_API } from '../constants/constants';
import { RootState } from '../app/store';

const baseApi = fetchBaseQuery({
    baseUrl: BASE_URL_API,
    prepareHeaders: (headers, { getState }) => {
        const token = ( getState() as RootState ).auth.user?.token || localStorage.getItem('token');

        token && headers.set('authorization', `Bearer ${ token }`);
    },
});

const baseQueryWithRetry = retry(baseApi, { maxRetries: 1 });

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ( {} ),
});