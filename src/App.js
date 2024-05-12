import React from 'react';
import './App.css';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import RatedMovies from "./pages/RatedMovies/RatedMovies";
import Movie from "./pages/Movie/Movie";
import NotFound from "./components/NotFound/NotFound";


const Layout = () => {
    return (
        <div className='app'>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/ratedMovies",
                element: <RatedMovies/>
            },
            {
                path: "/movie/:id",
                element: <Movie/>
            },
        ]
    },
]);

const App = () => {
    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
};

export default App;