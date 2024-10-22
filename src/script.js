import React, { lazy, useState, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/tempbody";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import Profile from "./components/Profile";
import Shimmer from "./components/Shimmer";
import { Provider } from "react-redux";
import store from "./Utils/store";
import Login from "./components/Login";
import Signup from "./components/Signup";

const Instamart = lazy(() => import("./components/Instamart"));
const About = lazy(() => import("./components/About"));
const Cart = lazy(() => import("./components/Cart"));

const AppLayout = () => {
  const [user, setUser] = useState({
    name: "Shreyansh Shukla",
    email: "shreyansh@mail.com",
  });

  return (
    <Provider store={store}>
      <div className="flex flex-col">
        <Header />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Body /> },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
        children: [{ path: "profile", element: <Profile /> }],
      },
      { path: "/contact", element: <Contact /> },
      { path: "restaurant/:resId", element: <RestaurantMenu /> },
      {
        path: "/instamart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Instamart />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Cart />
          </Suspense>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

// Render the React app and remove the loading screen after the app is loaded
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

// Remove the loading screen after the window is fully loaded
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading");
  if (loadingScreen) {
    loadingScreen.style.display = "none";
  }
});
