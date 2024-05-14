import React, {useEffect, useState} from 'react';
import s from './RatedMovies.module.css';
import Movies from "../Movies/Movies";
import useFetchAllData from "../../hooks/useFetchAllData";
import {MantineProvider, rem, TextInput} from "@mantine/core";
import {CiSearch} from "react-icons/ci";
import PaginationComponent from "../../components/Pagination/Pagination";

const RatedMovies = () => {
    const [activePage, setActivePage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || []);
    const {data: genresData, loading: genresLoading, error: genresError} = useFetchAllData('/genre/movie/list');
    const icon = <CiSearch style={{width: rem(16), height: rem(16)}}/>;
    const filteredMovies = data.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const handleLocalStorageChange = () => {
            setData(JSON.parse(localStorage.getItem('data')) || []);
        };
        window.addEventListener('localStorageChange', handleLocalStorageChange);

        return () => {
            window.removeEventListener('localStorageChange', handleLocalStorageChange);
        };
    }, []);

    return (
        <div className={s.container}>
            {data.length > 0 && (
                <div className={s.searchBlock}>
                    <h1>Rated movies</h1>
                    <MantineProvider>
                        <div className={s.inputGroup}>
                            <TextInput
                                leftSection={icon}
                                placeholder="Search movie title"
                                rightSection={
                                    <button className={s.btn}>Search</button>
                                }
                                className={s.input}
                                size="md"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                        </div>
                    </MantineProvider>
                </div>
            )}
            <div className={s.movieWrapper}>
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <Movies
                            key={movie.id}
                            genresData={genresData}
                            data={movie}
                            genresLoading={genresLoading}
                            moviesLoading={genresLoading}
                        />
                    ))
                ) : searchQuery ? (
                    <div className={s.notFoundMovie}>
                        <p>No movies found matching your search</p>
                    </div>
                ) : data.length === 0 ? (
                    <div className={s.notFoundMovie}>
                        <img src="/noRated.svg" alt="No films found"/>
                        <p>You haven't rated any films yet</p>
                    </div>
                ) : null}

            </div>
            {data.length > 0 && filteredMovies.length > 0 && (
                <div className={s.pagination}>
                    <PaginationComponent data={data} activePage={activePage} setActivePage={setActivePage}/>
                </div>
            )}
        </div>
    );
};

export default RatedMovies;
