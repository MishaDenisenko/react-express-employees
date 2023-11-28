import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Row, Space, Typography } from 'antd';

import { PATHS } from '../../constants/paths';
import { UserData, useRegisterMutation } from '../../services/auth';

import { isErrorWithMessage } from '../../utils/isErrorWithMessage';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import ErrorMessage from '../../components/ErrorMessage';


const Register: React.FC = () => {
    const [registerUser, registerUserResult] = useRegisterMutation();
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleOnFinish = async (data: UserData) => {
        try {
            await registerUser(data).unwrap();

            navigate('/');
        } catch (error) {
            const maybeError = isErrorWithMessage(error);
            maybeError ? setError(error.data.message) : setError('Unknown error');
        }
    };

    return (
        <Layout>
            <Row align={ 'middle' } justify={ 'center' } style={ { marginTop: 100 } }>
                <Card title={ 'Sign Up' } style={ { width: '30rem' } }>
                    <Form onFinish={ handleOnFinish }>
                        <Input name={ 'name' } placeholder={ 'Name' } type={ 'text' }/>
                        <Input name={ 'email' } placeholder={ 'Email' } type={ 'email' }/>
                        <Input isPassword={ true } name={ 'password' } placeholder={ 'Password' }/>
                        <Input isPassword={ true } name={ 'confirmPassword' } placeholder={ 'Confirm Password' }/>
                        <Button type={ 'primary' } htmlType={ 'submit' } isInForm={ true }>Sing Up</Button>
                    </Form>
                    <Space direction={ 'vertical' } size={ 'large' }>
                        <Typography.Text>
                            Already have an account? <Link to={ PATHS.login }>Sing In</Link>
                        </Typography.Text>
                        { error && <ErrorMessage message={ error }/> }
                    </Space>
                </Card>
            </Row>
        </Layout>
    );
};

export default Register;