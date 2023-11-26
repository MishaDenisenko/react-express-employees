import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

import { PATHS } from './constants/paths';

import Login from './containers/Login';
import Register from './containers/Register';
import Auth from './features/components';


const router = createBrowserRouter([
    {
        path: PATHS.home,
        element: <h1>Home</h1>,
    },
    {
        path: PATHS.login,
        element: <Login/>,
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