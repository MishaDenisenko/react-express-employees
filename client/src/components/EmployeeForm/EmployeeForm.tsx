import React from 'react';
import { Card, Form, Space } from 'antd';

import { Employee } from '../../types/types';

import Input from '../Input';
import ErrorMessage from '../ErrorMessage';
import Button from '../Button';

interface IEmployeeForm {
    onFinish: (values: Employee) => void,
    btnText: string,
    title: string,
    error?: string,
    initialValues?: Employee,
}

const EmployeeForm = (props: IEmployeeForm) => {
    const { onFinish, btnText, title, error, initialValues } = props;

    return (
        <Card title={ title } style={ { width: '30rem' } }>
            <Form name={ 'employee-form' } onFinish={ onFinish } initialValues={ initialValues }>
                <Input type={ 'text' } name={ 'firstName' } placeholder={ 'First Name' }/>
                <Input type={ 'text' } name={ 'lastName' } placeholder={ 'Last Name' }/>
                <Input type={ 'number' } name={ 'age' } placeholder={ 'Age' }/>
                <Input type={ 'text' } name={ 'address' } placeholder={ 'Address' }/>
                <Space>
                    <Button htmlType={ 'submit' } type={ 'primary' }>
                        { btnText }
                    </Button>
                    { error && <ErrorMessage message={ error }/> }
                </Space>
            </Form>
        </Card>
    );
};

export default EmployeeForm;