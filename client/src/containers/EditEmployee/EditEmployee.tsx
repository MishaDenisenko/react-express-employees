import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Row } from 'antd';
import EmployeeForm from '../../components/EmployeeForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditEmployeeMutation, useGetEmployeeByIdQuery } from '../../services/employees';
import { PATHS } from '../../constants/paths';
import BackLink from '../../components/BackLink';
import { Employee } from '../../types/types';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';

const EditEmployee = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState<string>('');

    const { data, isLoading } = useGetEmployeeByIdQuery(id || '');
    const [editEmployee] = useEditEmployeeMutation();


    const handleOnFinish = async (employee: Employee) => {
        try {
            const editedEmployee: Employee = {
                ...data,
                ...employee,
            };
            await editEmployee(editedEmployee).unwrap();

            navigate(`${ PATHS.status }/updated`);
        } catch (error) {
            const maybeError = isErrorWithMessage(error);

            maybeError ? setError(error.data.message) : setError('Unknown error');
        }
    };

    return (
        <Layout>
            <BackLink path={ `${ PATHS.employee }/${ id }` } title={ 'Back' }/>
            { isLoading
                ? <span>Loading...</span>
                :
                <Row align={ 'middle' } justify={ 'center' }>
                    <EmployeeForm
                        onFinish={ handleOnFinish }
                        btnText={ 'Edit' }
                        title={ 'Edit Information' }
                        initialValues={ data }
                        error={ error }
                    />
                </Row>
            }
        </Layout>
    );
};

export default EditEmployee;