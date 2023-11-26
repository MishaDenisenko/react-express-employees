import React from 'react';
import { Alert } from 'antd';

interface IErrorMessage {
    message: string;
}

const ErrorMessage = (props: IErrorMessage) => {
    const { message } = props;

    return <Alert message={ message } type={ 'error' }/>;
};

export default ErrorMessage;