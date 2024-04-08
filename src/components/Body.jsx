import React from 'react';
import Browse from './Browse';
import tempbody from './tempbody';
import Login from './Login';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';


const Body = () => {    
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <tempbody />
        }
    ]);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body
