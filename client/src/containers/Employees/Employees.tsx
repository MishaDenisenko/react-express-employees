import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';

import { Employee } from '../../types/types';

import { PATHS } from '../../constants/paths';
import { useGetAllEmployeesQuery } from '../../services/employees';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/slices/authSlice';

import Layout from '../../components/Layout';
import Button from '../../components/Button';

const tableColumns: ColumnsType<Employee> = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];
const Employees: React.FC = () => {
    const { data, isLoading } = useGetAllEmployeesQuery();
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        !user && navigate(PATHS.login);
    }, [user, navigate]);

    return (
        <Layout>
            <Button type={ 'primary' } onClick={ () => {} } icon={ <PlusCircleOutlined/> } isInForm={true}>
                Add Employee
            </Button>
            <Table
                loading={ isLoading }
                columns={ tableColumns }
                dataSource={ data }
                rowKey={ employee => employee.id }
                onRow={ employee => ( { onClick: () => navigate(`${ PATHS.employee }/${ employee.id }`) } ) }
            />
        </Layout>
    );
};

export default Employees;