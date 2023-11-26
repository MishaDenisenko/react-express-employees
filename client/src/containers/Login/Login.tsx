import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Card, Form, Space, Typography } from 'antd';

import { PATHS } from '../../constants/paths';

import Layout from '../../components/Layout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useLoginMutation, UserData } from '../../services/auth';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

interface ILogin {

}

const Login = (props: ILogin) => {
    const navigate = useNavigate();
    const [loginUser, loginUserResult] = useLoginMutation();
    const [error, setError] = useState<string>('');

    const handleOnFinish = async (data: UserData) => {
        try {
            await loginUser(data).unwrap();

            navigate('/');
        } catch (error) {
            const maybeError = isErrorWithMessage(error);
            maybeError ? setError(error.data.message) : setError('Unknown error');
        }
    };

    return (
        <Layout>
            <Row align={ 'middle' } justify={ 'center' } style={ { marginTop: 100 } }>
                <Card title={ 'Sign In' } style={ { width: '30rem' } }>
                    <Form onFinish={ handleOnFinish }>
                        <Input isPassword={ false } name={ 'email' } placeholder={ 'Email' } type={ 'email' }/>
                        <Input isPassword={ true } name={ 'password' } placeholder={ 'Password' }/>
                        <Button type={ 'primary' } htmlType={ 'submit' }>Sing In</Button>
                    </Form>
                    <Space direction={ 'vertical' } size={ 'large' }>
                        <Typography.Text>
                            Don`t have an account? <Link to={ PATHS.register }>Sing Up</Link>
                        </Typography.Text>
                        { error && <ErrorMessage message={ error }/> }
                    </Space>
                </Card>
            </Row>
        </Layout>
    );
};

export default Login;