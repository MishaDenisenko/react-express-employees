import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

import { PATHS } from './constants/paths';

import Login from './containers/Login';
import Register from './containers/Register';
import Auth from './features/components';
import Employees from './containers/Employees';
import AddEmployee from './containers/AddEmployee';
import Status from './containers/Status';


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
    {
        path: PATHS.employeeAdd,
        element: <AddEmployee/>,
    },
    {
        path: `${PATHS.status}/:status`,
        element: <Status/>,
    },
]);

const App: React.FC = () => {
    return (
        <ConfigProvider theme={ { algorithm: theme.darkAlgorithm } }>
            <Auth>
                <RouterProvider router={ router }/>
            </Auth>
        </ConfigProvider>
    );
};

export default App;