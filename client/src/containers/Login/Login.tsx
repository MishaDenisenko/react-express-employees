import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Card, Form, Space, Typography } from 'antd';

import { PATHS } from '../../constants/paths';

import Layout from '../../components/Layout';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface ILogin {

}

const Login = (props: ILogin) => {
    return (
        <Layout>
            <Row align={ 'middle' } justify={ 'center' } style={ { marginTop: 100 } }>
                <Card title={ 'Sign In' } style={ { width: '30rem' } }>
                    <Form onFinish={ () => null }>
                        <Input isPassword={ false } name={ 'email' } placeholder={ 'Email' } type={ 'email' }/>
                        <Input isPassword={ true } name={ 'password' } placeholder={ 'Password' }/>
                        <Button type={ 'primary' } htmlType={ 'submit' }>Sing In</Button>
                    </Form>
                    <Space direction={ 'vertical' } size={ 'large' }>
                        <Typography.Text>
                            Don`t have an account? <Link to={ PATHS.register }>Sing Up</Link>
                        </Typography.Text>
                    </Space>
                </Card>
            </Row>
        </Layout>
    );
};

export default Login;