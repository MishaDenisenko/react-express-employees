import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Space} from 'antd';

interface ILinkHome {
    path: string;
    title: 'Back' | 'Home';
}

const BackLink = (props: ILinkHome) => {
    const { path, title } = props;

    return (
        <Space style={ { marginTop: 30, marginBottom: 30 } }>
            <Link to={ path }>
                <ArrowLeftOutlined style={{marginRight: 5}}/>
                <span>{ title }</span>
            </Link>
        </Space>
    );
};

export default BackLink;