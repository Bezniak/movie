import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={s.block}>
            <NavLink to='/' className={s.logoBlock}>
                <img src="/logoMain.svg" alt="logo"/>
                <h1>ArrowFlicks</h1>
            </NavLink>
            <div className={s.linksBlock}>
                <NavLink to='/' className={({ isActive }) => (isActive ? s.active : '')}>
                    Movies
                </NavLink>
                <NavLink to='/ratedMovies' className={({ isActive }) => (isActive ? s.active : '')}>
                    Rated movies
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;