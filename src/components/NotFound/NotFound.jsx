import React from 'react';
import s from './NotFound.module.css';
import {NavLink} from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <NavLink to='/' className={s.logoBlock}>
                <img src="/logoMain.svg" alt="logo"/>
                <h1>ArrowFlicks</h1>
            </NavLink>
            <div className={s.notFoundBlock}>
                <img src="/notFound.png" alt="not found"/>
                <h1>Page not found 404</h1>
                <img src="/notFound.png" alt="not found"/>
                <p>We can’t find the page you are looking for</p>
                <button>
                    <NavLink to='/'>
                        Go Home
                    </NavLink>
                </button>
            </div>
        </>
    );
};

export default NotFound;