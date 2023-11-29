import { Employee } from '../types/types';
import { api } from './api';

export const employees = api.injectEndpoints({
    endpoints: builder => ( {
        getAllEmployees: builder.query<Employee[], void>({
            query: () => ( {
                url: '/employee',
                method: 'GET',
            } ),
        }),
        getEmployeeById: builder.query<Employee, string>({
            query: (id) => ( {
                url: `/employee/${ id }`,
                method: 'GET',
            } ),
        }),
        addEmployees: builder.mutation<Employee, Employee>({
            query: (employee) => ( {
                url: `/employee/add/`,
                method: 'POST',
                body: employee,
            } ),
        }),
        removeEmployee: builder.mutation<string, string>({
            query: (id) => ( {
                url: `/employee/remove/${ id }`,
                method: 'POST',
                body: { id },
            } ),
        }),
        editEmployee: builder.mutation<string, Employee>({
            query: (employee) => ( {
                url: `/employee/edit/${ employee.id }`,
                method: 'PUT',
                body: employee,
            } ),
        }),
    } ),
});

export const {
    useGetAllEmployeesQuery,
    useGetEmployeeByIdQuery,
    useAddEmployeesMutation,
    useRemoveEmployeeMutation,
    useEditEmployeeMutation,
} = employees;

export const { getAllEmployees, getEmployeeById, addEmployees, removeEmployee, editEmployee } = employees.endpoints;
