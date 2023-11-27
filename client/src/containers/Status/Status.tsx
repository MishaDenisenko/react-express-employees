import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Result, Row } from 'antd';
import Button from '../../components/Button';
import { PATHS } from '../../constants/paths';

const statuses: Record<string, string> = {
    crated: 'Employee created successfully',
    updated: 'Employee`s information updated successfully',
    deleted: 'Employee removed successfully',
}

const Status = () => {
    const {status} = useParams();

    console.log(status);
    return (
        <Row align="middle" justify="center" style={{ width: "100%" }}>
            <Result
                status={status ? 'success' : 404}
                title={status ? statuses[status] : 'not information'}
                extra={
                    <Button key="dashboard">
                        <Link to={PATHS.home}>Home Page</Link>
                    </Button>
                }
            />
        </Row>
    );
};

export default Status;