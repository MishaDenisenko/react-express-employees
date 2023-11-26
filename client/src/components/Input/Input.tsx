import React from 'react';
import { Form, Input as AntInput, InputProps } from 'antd';
import { NamePath } from 'antd/es/form/interface';


interface IInput extends InputProps {
    name: string,
    placeholder: string,
    isPassword: boolean,
    dependencies?: NamePath[] | undefined
}

const Input = (props: IInput) => {
    const { isPassword, name, placeholder, type = 'text', size = 'large', dependencies } = props;

    const requiredRule = { required: true, message: 'Required field' };

    return (
        isPassword ?
            <Form.Item name={ name } dependencies={ dependencies }
                       rules={ [requiredRule, ({ getFieldValue }) => ( {
                           validator(_, value) {
                               if (!value) return Promise.resolve();

                               if (name === 'confirmPassword') {
                                   return getFieldValue('password') === value
                                       ? Promise.resolve()
                                       : Promise.reject(new Error('Passwords don`t match'));
                               } else {
                                   return value.length < 6
                                       ? Promise.reject(new Error('At least 6 symbols'))
                                       : Promise.resolve();
                               }
                           },
                       } )] }
            >
                <AntInput.Password placeholder={ placeholder } size={ size }/>
            </Form.Item>
            :
            <Form.Item name={ name } shouldUpdate={ true } rules={ [requiredRule] }>
                <AntInput placeholder={ placeholder } type={ type } size={ size }/>
            </Form.Item>

    );
};

export default Input;