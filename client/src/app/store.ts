import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { api } from '../services/api';
import authSlice from '../features/slices/authSlice';
import employeesSlice from '../features/slices/employeesSlice';
import { listenerMiddleware } from '../middleware/authMiddleware';


export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        authSlice,
        employeesSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
