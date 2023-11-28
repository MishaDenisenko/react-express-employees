import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row } from 'antd';

import { useAddEmployeesMutation } from '../../services/employees';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/slices/authSlice';

import { PATHS } from '../../constants/paths';
import { Employee } from '../../types/types';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';

import Layout from '../../components/Layout';
import EmployeeForm from '../../components/EmployeeForm';
import BackLink from '../../components/BackLink';

const AddEmployee: React.FC = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const [addEmployee] = useAddEmployeesMutation();
    const [error, setError] = useState<string>('');

    useEffect(() => {
        !user && navigate(PATHS.login);
    }, [user, navigate]);

    const handleAddEmployee = async (data: Employee) => {
        try {
            await addEmployee(data).unwrap();

            navigate(`${ PATHS.status }/created`);
        } catch (error) {
            const maybeError = isErrorWithMessage(error);
            maybeError ? setError(error.data.message) : setError('Unknown error');
        }
    };

    return (
        <Layout>
            <BackLink path={PATHS.home} title={'Back'}/>
            <Row align={ 'middle' } justify={ 'center' }>
                <EmployeeForm onFinish={ handleAddEmployee } btnText={ 'Add' } title={ 'Add employee' } error={error}/>
            </Row>
        </Layout>
    );
};

export default AddEmployee;