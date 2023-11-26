import { createListenerMiddleware } from '@reduxjs/toolkit';
import { login } from '../services/auth';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: login.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        action.payload.token && localStorage.setItem('token', action.payload.token);
    }
})
