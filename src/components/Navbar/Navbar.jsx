import React, {useRef, useState} from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {CgMenuLeft} from "react-icons/cg";
import {IoCloseOutline} from "react-icons/io5";

const Navbar = () => {

    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const touchStartXRef = useRef(0);
    const touchMoveXRef = useRef(0);

    const handleMobileMenuClick = () => {
        setIsMenuClicked(prev => !prev);

    };

    const handleTouchStart = (event) => {
        touchStartXRef.current = event.touches[0].clientX;
    };

    const handleTouchMove = (event) => {
        touchMoveXRef.current = event.touches[0].clientX;
        const touchDistance = touchStartXRef.current - touchMoveXRef.current;

        if (touchDistance > 100) {
            setIsMenuClicked(false);
        }
    };


    return (
        <>
            <div className={s.block}>
                <NavLink to='/' className={s.logoBlock}>
                    <img src="/logoMain.svg" alt="logo"/>
                    <h1>ArrowFlicks</h1>
                </NavLink>
                <div className={s.linksBlock}>
                    <NavLink to='/' className={({isActive}) => (isActive ? s.active : '')}>
                        Movies
                    </NavLink>
                    <NavLink to='/ratedMovies' className={({isActive}) => (isActive ? s.active : '')}>
                        Rated movies
                    </NavLink>
                </div>
            </div>
            <div className={s.mobileMenu}>
                <div className={s.hamburgerMenu}>
                    <CgMenuLeft onClick={handleMobileMenuClick}/>
                    <NavLink to="/">
                        <img src="/logoMain.svg" alt="logo" className={s.logo}/>
                    </NavLink>
                </div>
                <div className={`${s.hamburgerMenuList} ${isMenuClicked ? s.open : ""}`} onTouchStart={handleTouchStart}
                     onTouchMove={handleTouchMove}>
                    <div className={s.menuBlock}>
                        <h1>Menu</h1>
                        <IoCloseOutline onClick={handleMobileMenuClick}/>
                    </div>
                    <hr/>
                    <NavLink to="/" onClick={handleMobileMenuClick}>
                        Movies
                    </NavLink>
                    <NavLink to="/ratedMovies" onClick={handleMobileMenuClick}>
                        Rated movies
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Navbar;