import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

import { PATHS } from './constants/paths';

import Login from './containers/Login';
import Register from './containers/Register';


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
            <RouterProvider router={ router }/>
        </ConfigProvider>
    );
};

export default App;