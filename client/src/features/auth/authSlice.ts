import { createSlice } from '@reduxjs/toolkit';

import { ResponseUserData, login, register, current } from '../../services/auth';
import { RootState } from '../../app/store';


interface IInitialState {
    user: ResponseUserData & {token: string} | null,
    isAuthenticated: boolean
}

const initialState: IInitialState = {
    user: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => (
        builder
            .addMatcher(login.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addMatcher(register.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addMatcher(current.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })
    )
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;