import React, { JSX } from 'react';
import { useCurrentQuery } from '../../services/auth';

interface IAuth {
    children: JSX.Element;
}

const Auth = (props: IAuth) => {
    const { children } = props;
    const { isLoading } = useCurrentQuery();

    return isLoading ? <span>Loading...</span> : children;
};

export default Auth;