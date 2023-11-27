import React from 'react';
import { Form, Button as AntButton, ButtonProps } from 'antd';


interface IButton extends ButtonProps {
    isInForm?: boolean;
}

const CustomButton = (props: IButton) => {
    const {
        htmlType, type, onClick, danger, loading, shape, icon, children,
    } = props;

    return (
        <AntButton
            type={type}
            htmlType={htmlType}
            danger={danger}
            loading={loading}
            size="large"
            shape={ shape }
            onClick={ onClick }
            icon={ icon }
        >
            {children}
        </AntButton>
    )
}

const Button = (props: IButton) => {
    const { isInForm } = props;


    return !isInForm ? <CustomButton {...props}></CustomButton> : <Form.Item><CustomButton {...props}></CustomButton></Form.Item>;
};

export default Button;