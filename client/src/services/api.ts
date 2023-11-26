import { createApi, fetchBaseQuery, retry, } from '@reduxjs/toolkit/query/react';

import { BASE_URL_API } from '../constants/constants';

const baseApi = fetchBaseQuery({
    baseUrl: BASE_URL_API,
});

const baseQueryWithRetry = retry(baseApi, { maxRetries: 1 });

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ( {} ),
});