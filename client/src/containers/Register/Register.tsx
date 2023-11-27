import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Row, Space, Typography } from 'antd';

import { PATHS } from '../../constants/paths';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Layout from '../../components/Layout';


const Register: React.FC = () => {
    return (
        <Layout>
            <Row align={ 'middle' } justify={ 'center' } style={ { marginTop: 100 } }>
                <Card title={ 'Sign Up' } style={ { width: '30rem' } }>
                    <Form onFinish={ () => null }>
                        <Input name={ 'name' } placeholder={ 'Name' } type={ 'text' }/>
                        <Input name={ 'email' } placeholder={ 'Email' } type={ 'email' }/>
                        <Input isPassword={ true } name={ 'password' } placeholder={ 'Password' }/>
                        <Input isPassword={ true } name={ 'confirmPassword' } placeholder={ 'Confirm Password' }/>
                        <Button type={ 'primary' } htmlType={ 'submit' } isInForm={true}>Sing Up</Button>
                    </Form>
                    <Space direction={ 'vertical' } size={ 'large' }>
                        <Typography.Text>
                            Already have an account? <Link to={ PATHS.login }>Sing In</Link>
                        </Typography.Text>
                    </Space>
                </Card>
            </Row>
        </Layout>
    );
};

export default Register;