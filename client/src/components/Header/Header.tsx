import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

import { PATHS } from '../../constants/paths';

import Button from '../Button';

import styles from './Header.module.css';


interface IHeader {

}

const Header = (props: IHeader) => {
    return (
        <Layout.Header className={ styles.header }>
            <Space>
                <TeamOutlined className={ styles.teamIcon }/>
                <Link to={ PATHS.home }>
                    <Button type={ 'ghost' }>
                        <Typography.Title level={ 1 }>Employees</Typography.Title>
                    </Button>
                </Link>
            </Space>
            <Space>
                <Link to={ PATHS.register }>
                    <Button type={ 'ghost' } icon={ <UserOutlined/> }>
                        Sing Up
                    </Button>
                </Link>
                <Link to={ PATHS.login }>
                    <Button type={ 'ghost' } icon={ <LoginOutlined/> }>
                        Sing In
                    </Button>
                </Link>
            </Space>
        </Layout.Header>
    );
};


export default Header;