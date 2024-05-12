import React, {useState} from 'react';
import Filter from "../../components/Filter/Filter";
import useFetchAllData from "../../hooks/useFetchAllData";
import Movies from "../Movies/Movies";
import s from './Home.module.css';
import PaginationComp from "../../components/Pagination/Pagination";
import Preloader from "../../components/Preloader/Preloader";

const Home = () => {

    const [filters, setFilters] = useState({
        selectedGenre: [],
        selectedYear: null,
        numberFrom: '',
        numberTo: '',
        sortBy: 'popularity.desc',
    });

    const [activePage, setPage] = useState(1);


    const {data: genresData, loading: genresLoading, error: genresError} = useFetchAllData('/genre/movie/list');

    const {data: moviesData, loading: moviesLoading, error: moviesError} = useFetchAllData(
        `/discover/movie?language=en-US&with_genres=${filters.selectedGenre.join(',')}&primary_release_year=${filters.selectedYear}&vote_average.lte=${filters.numberFrom}&vote_average.gte=${filters.numberTo}&page=${activePage}&sort_by=${filters.sortBy}`
    );

    console.log('всегооооо', moviesData)

    const handleReset = () => {
        setFilters({
            selectedGenre: [],
            selectedYear: null,
            numberFrom: '',
            numberTo: '',
            sortBy: 'popularity.desc'
        });
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({length: currentYear - 1949}, (_, index) => ({
        value: String(currentYear - index),
        label: String(currentYear - index)
    }));

    return (
        <div className={s.container}>
            <h1>Movies</h1>
            <Filter genresData={genresData} genresError={genresError} genresLoading={genresLoading} years={years}
                    handleReset={handleReset}
                    filters={filters} setFilters={setFilters}/>
            <div className={s.movieWrapper}>
                {moviesData && moviesData.results && moviesData.results.length > 0 ? (
                    moviesData.results.map(movie => (
                        <Movies genresData={genresData} data={movie} key={movie.id} genresLoading={genresLoading}
                                moviesLoading={moviesLoading}/>
                    ))
                ) : (
                    <div className={s.notFoundMovie}>
                        <img src="/notFoundFilm.svg" alt="No films found"/>
                        <p>We don't have such movies, look for another one</p>
                    </div>
                )}
            </div>
            <div className={s.pagination}>
                {
                    !moviesData
                        ? <Preloader/>
                        : <PaginationComp total={moviesData} activePage={activePage} setPage={setPage}/>
                }
            </div>
        </div>
    );
};

export default Home;
