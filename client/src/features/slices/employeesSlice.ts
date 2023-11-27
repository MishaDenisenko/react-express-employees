import { Employee } from '../../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { getAllEmployees } from '../../services/employees';
import { RootState } from '../../app/store';

interface IInitialState {
    employees: Employee[] | null
}

const initialState: IInitialState = {
    employees: null
}

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: builder => {
        builder.addMatcher(getAllEmployees.matchFulfilled, (state, action) => {
            state.employees = action.payload;
        })
    }
})

export default employeesSlice.reducer;

export const selectEmployees = (state: RootState) => state.employeesSlice.employees