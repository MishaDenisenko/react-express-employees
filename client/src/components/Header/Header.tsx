import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';
import { LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

import { PATHS } from '../../constants/paths';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, selectUser } from '../../features/slices/authSlice';

import Button from '../Button';

import styles from './Header.module.css';


interface IHeader {

}

const Header = (props: IHeader) => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate(PATHS.login);
    };

    return (
        <Layout.Header className={ styles.header }>
            <Space className={styles.logo} >
                <TeamOutlined className={ styles.teamIcon }/>
                <Link to={ user ? PATHS.home : PATHS.login }>
                    <Typography.Title level={ 1 } style={ { marginBottom: 0 } }>Employees</Typography.Title>
                </Link>
            </Space>
            <Space> {
                user ? (
                    <>
                        <Typography.Text>{ user.name }</Typography.Text>
                        <Button type={ 'ghost' } icon={ <LogoutOutlined/> } onClick={ handleLogout }>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
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
                    </>
                )
            }

            </Space>
        </Layout.Header>
    );
};


export default Header;