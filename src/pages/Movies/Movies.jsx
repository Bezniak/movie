import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import s from './Movies.module.css';
import { extractGenres, formatCount, getGenreNamesByIds } from "../../common/utils/utils";
import { BiSolidStar } from "react-icons/bi";
import { animateScroll as scroll } from "react-scroll";
import RatingPopApp from "../../components/RatingPopApp/RatingPopApp";
import Preloader from "../../components/Preloader/Preloader";

const Movies = ({ data, genresData, moviesLoading, genresLoading }) => {
    const [ratingClicked, setRatingClicked] = useState(false);
    const [storedRating, setStoredRating] = useState(null);

    useEffect(() => {
        // Load rating from localStorage when component mounts
        const savedRating = localStorage.getItem(`rating_${data.id}`);
        if (savedRating !== null) {
            setStoredRating(parseInt(savedRating));
        }
    }, [data.id]);

    const handleStarClick = () => {
        setRatingClicked(true);
    };

    const handleClick = () => {
        // Smooth scroll to top using react-scroll
        scroll.scrollToTop({
            duration: 0, // Animation duration in milliseconds
            smooth: 'easeInOutQuad', // Animation type
        });
    };

    if (moviesLoading || genresLoading) return <Preloader />;

    return (
        <div className={s.linkBlock}>
            {ratingClicked && <div className={s.overlay}></div>}
            <div className={s.linkWrapper}>
                <div>
                    <img className={s.image}
                         src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '/movie-cart.png'}
                         alt={`Image of ${data.title}`}
                    />
                </div>
                <div className={s.movieDescBlock}>
                    <div>
                        <NavLink to={`/movie/${data.id}`} onClick={handleClick}>
                            <h2 className={s.movieTitle}>{data.original_title}</h2>
                        </NavLink>
                        <p className={s.movieYear}>{data.release_date.substring(0, 4)}</p>
                        <div className={s.ratingBlock}>
                            <img src="/star.svg" alt="star" />
                            <span className={s.voteAverage}>{data.vote_average.toFixed(1)}</span>
                            &nbsp;
                            <span className={s.voteCount}>({formatCount(data.vote_count)})</span>
                        </div>
                    </div>
                    <div className={s.genresDesc}>
                        <p>
                            <span className={s.genres}>Genres</span> &nbsp;
                            {getGenreNamesByIds(extractGenres(genresData), data.genre_ids).join(', ')}
                        </p>
                    </div>
                </div>

                <div className={s.starBlock}>
                    <BiSolidStar className={storedRating !== null ? s.clickedStarRated : s.clickedStar} onClick={handleStarClick} />
                    <span className={s.myRating}>{storedRating !== null ? storedRating : ''}</span>
                </div>

            </div>

            {ratingClicked && (
                <div className={s.popApp}>
                    <RatingPopApp data={data} setRatingClicked={setRatingClicked} setStoredRating={setStoredRating} />
                </div>
            )}
        </div>
    );
};

export default Movies;
