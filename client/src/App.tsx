import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

import { PATHS } from './constants/paths';

import Login from './containers/Login';
import Register from './containers/Register';
import Auth from './features/components';
import Employees from './containers/Employees';


const router = createBrowserRouter([
    {
        path: PATHS.login,
        element: <Login/>,
    },
    {
        path: PATHS.home,
        element: <Employees/>,
    },
    {
        path: PATHS.register,
        element: <Register/>,
    },
]);

const App = () => {
    return (
        <ConfigProvider theme={ { algorithm: theme.darkAlgorithm } }>
            <Auth>
                <RouterProvider router={ router }/>
            </Auth>
        </ConfigProvider>
    );
};

export default App;