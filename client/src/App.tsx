import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
        <RouterProvider router={router}/>
    );
};

export default App;