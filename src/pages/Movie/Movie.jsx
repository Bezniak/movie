import React, {useEffect, useState} from 'react';
import s from './Movie.module.css';
import {NavLink, useParams} from "react-router-dom";
import useFetchAllData from "../../hooks/useFetchAllData";
import {formatCount, formatDate, formatNumber, formatRuntime} from "../../common/utils/utils";
import {BiSolidStar} from "react-icons/bi";
import Preloader from "../../components/Preloader/Preloader";
import RatingPopApp from "../../components/RatingPopApp/RatingPopApp";

const Movie = () => {

    const id = useParams().id;

    const {data, loading, error} = useFetchAllData(`/movie/${id}?language=en-US`);
    const {data: genresData, loading: genesLoading, error: genesError} = useFetchAllData('/genre/movie/list');
    const [ratingClicked, setRatingClicked] = useState(false);

    const [storedRating, setStoredRating] = useState(null);
    const handleStarClick = () => {
        setRatingClicked(true);
    };

    useEffect(() => {
        // Load rating from localStorage when component mounts
        const savedRating = localStorage.getItem(`rating_${data.id}`);
        if (savedRating !== null) {
            setStoredRating(parseInt(savedRating));
        }
    }, [data.id]);

    if (loading) return <Preloader/>
    if (error) return <div className='error'>We are very sorry! Some error occurred: {error.message}</div>

    return (
        <div className={s.movieWrapper}>
            {ratingClicked && <div className='overlay'></div>}
            <div className={s.movieContainer}>
                <div className={s.link}>
                    <NavLink to='/'>Movies</NavLink> <span className={s.slash}>/</span> <span>{data?.title}</span>
                </div>
                <div className={s.movieIntro}>
                    <div>
                        <img className={s.image}
                             src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '/movie-cart.png'}
                             alt={`Image of ${data.title}`}
                        />
                    </div>
                    <div className={s.movieDescription}>
                        <div>
                            <h2 className={s.movieTitle}>{data?.original_title}</h2>
                            <p className={s.movieYear}>{data?.release_date?.substring(0, 4)}</p>
                            <div className={s.ratingBlock}>
                                <img src="/star.svg" alt="star"/>
                                <span className={s.voteAverage}>{data?.vote_average?.toFixed(1)}</span>
                                &nbsp;
                                <span className={s.voteCount}>({formatCount(data?.vote_count)})</span>
                            </div>
                        </div>
                        <div className={s.filmDetails}>
                            <div className={s.detailsTitle}>
                                <p>Duration</p>
                                <p>Premiere</p>
                                <p>Budget</p>
                                <p>Gross worldwide</p>
                                <p>Genres</p>
                            </div>
                            <div className={s.detailsDesc}>
                                <p>{formatRuntime(data.runtime)}</p>
                                <p>{formatDate(data.release_date)}</p>
                                <p>${formatNumber(data.budget)}</p>
                                <p>${formatNumber(data.revenue)}</p>
                                <p>{data.genres && data.genres.map(genre => genre.name).join(', ')}</p>
                            </div>
                        </div>
                    </div>
                    <div className={s.starBlock}>
                        <BiSolidStar className={storedRating !== null ? 'clickedStarRated' : 'clickedStar'} onClick={handleStarClick} />
                        <span className={s.myRating}>{storedRating !== null ? storedRating : ''}</span>
                    </div>
                </div>
            </div>

            <div className={s.trailerContainer}>
                <h2 className={s.title}>Trailer</h2>
                <video controls width="500" height="281" style={{borderRadius: '10px'}}>
                    {data.video && <source src={data.video} type="video/mp4"/>}
                    Ваш браузер не поддерживает воспроизведение видео.
                </video>
                <hr className={s.hr}/>
                <div>
                    <h2 className={s.title}>Description</h2>
                    <p>{data.overview}</p>
                </div>
                <hr className={s.hr}/>

                <div>
                    <h2 className={s.title}>Production</h2>
                    {data?.production_companies?.map((item) => (
                        <div key={item.id} className={s.productionBlock}>
                            <img
                                src={item.logo_path ? `https://image.tmdb.org/t/p/w500${item.logo_path}` : '/movie-cart.png'}
                                alt={item.name}
                            />
                            <h3>{item?.name}</h3>
                        </div>
                    ))}
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

export default Movie;