import React from 'react';
import Movies from "../Movies/Movies";
import useFetchAllData from "../../hooks/useFetchAllData";

const RatedMovies = () => {

    const data = localStorage.getItem(`data`)
    const {data: genresData, loading: genresLoading, error: genresError} = useFetchAllData('/genre/movie/list');


    console.log('из хранилища', data)
    return (
        <div>

            <Movies data={data} genresData={genresData} genresLoading={genresLoading} moviesLoading={''}/>
        </div>
    );
};

export default RatedMovies;