import React from 'react';
import { Layout as AntLayout } from 'antd';

import Header from '../Header';

import styles from './Layout.module.css';


interface ILayout {
    children: React.ReactNode,
}

const Layout = (props: ILayout) => {
    const { children } = props;

    return (
        <div className={ styles.container }>
            <Header/>
            <AntLayout.Content style={ { height: '100%' } }>
                { children }
            </AntLayout.Content>
        </div>
    );
};


export default Layout;