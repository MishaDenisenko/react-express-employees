import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Descriptions, Divider, Modal, Space } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { PATHS } from '../../constants/paths';
import { useGetEmployeeByIdQuery, useRemoveEmployeeMutation } from '../../services/employees';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/slices/authSlice';

import { isErrorWithMessage } from '../../utils/isErrorWithMessage';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import BackLink from '../../components/BackLink';

const EmployeesInfo: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const user = useAppSelector(selectUser);

    const { data, isLoading } = useGetEmployeeByIdQuery(id || '');
    const [removeEmployee] = useRemoveEmployeeMutation();

    useEffect(() => {
        !user && navigate(PATHS.login);
    }, [user, navigate]);

    const handleDeleteUser = async () => {
        setIsModalOpen(false)

        if (!data) return setError('No data to delete');

        try {
            await removeEmployee(data.id).unwrap();

            navigate(`${PATHS.status}/deleted`);
        } catch (err) {
            const maybeError = isErrorWithMessage(err);

            maybeError ? setError(err.data.message) : setError('Unknown error');
        }
    };

    if (!isLoading && !data) return <Navigate to={PATHS.home}/>;

    return (
        <Layout>

            <BackLink path={PATHS.home} title={'Back'}/>
            { isLoading
                ? <span>Loading...</span>
                :
                <Descriptions title={ 'Employee information' } bordered>
                    <Descriptions.Item span={ 3 } label={ 'First Name' }>
                        { `${ data?.firstName } ${ data?.lastName }` }
                    </Descriptions.Item>
                    <Descriptions.Item span={ 3 } label={ 'Age' }>
                        { `${ data?.age } ${ data?.age }` }
                    </Descriptions.Item>
                    <Descriptions.Item span={ 3 } label={ 'Address' }>
                        { `${ data?.address } ${ data?.address }` }
                    </Descriptions.Item>
                </Descriptions>
            }
            { user?.id === data?.userId && (
                <>
                    <Divider orientation={ 'left' }>Action</Divider>
                    <Space>
                        <Link to={ `${ PATHS.employeeEdit }/${ data?.id }` }>
                            <Button shape={ 'round' } type={ 'default' } icon={ <EditOutlined/> }>
                                Edit
                            </Button>
                        </Link>
                        <Button shape={ 'round' } danger={ true } onClick={ () => setIsModalOpen(true) }
                                icon={ <DeleteOutlined/> }>
                            Remove
                        </Button>
                    </Space>
                </>
            ) }

            <Modal
                title='Confirm deletion'
                open={ isModalOpen }
                onOk={ handleDeleteUser }
                onCancel={ () => setIsModalOpen(false) }
                okText='Confirm'
                cancelText='Сancel'
            >
                Do you really want to remove an employee from the table
            </Modal>
            {error && <ErrorMessage message={error}/>}
        </Layout>
    );
};

export default EmployeesInfo;