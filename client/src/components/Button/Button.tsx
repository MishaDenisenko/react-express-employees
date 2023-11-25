import React from 'react';
import { Form, Button as AntButton, ButtonProps } from 'antd';


interface IButton extends ButtonProps {}

const Button = (props: IButton) => {
    const {
        htmlType, type, onClick, danger, loading, shape, icon, children,
    } = props;

    return (<Form.Item>
            <AntButton
                htmlType={ htmlType || 'button' }
                type={ type }
                onClick={ onClick }
                danger={ danger }
                loading={ loading }
                shape={ shape }
                icon={ icon }
            >
                { children }
            </AntButton>
        </Form.Item>);
};

export default Button;