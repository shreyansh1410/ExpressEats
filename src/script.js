import React, { lazy } from "react";
import ReactDOM from 'react-dom/client';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
// import About from "./components/About";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import Profile from "./components/Profile";
import { Suspense } from "react";
import Shimmer from "./components/Shimmer";
// import Instamart from "./components/Instamart";
//Config Driven UI

const Instamart = lazy(() => import("./components/Instamart"));
const About = lazy(() => import("./components/About"));

const AppLayout = () => {
    return (
        <React.Fragment>
            <Header />
            <Outlet/>
            <Footer />
        </React.Fragment>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        errorElement: <Error/>,
        children:[
            {
                path: "/",
                element: <Body/>
            },
            {
                path: "/about",
                element: 
                <Suspense fallback={<h1>Loading...</h1>}>
                    <About/>
                </Suspense>,
                children:[{
                    path: "profile",
                    element: <Profile/>
                }]
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "restaurant/:resId",
                element: <RestaurantMenu/>
            },
            {
                path: "/instamart",
                element: 
                <Suspense fallback=<Shimmer/>>
                    <Instamart/>
                </Suspense>
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);