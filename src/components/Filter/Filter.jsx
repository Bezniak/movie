import React from 'react';
import s from './Filter.module.css';
import {MantineProvider, MultiSelect, NumberInput, Select} from '@mantine/core';
import '@mantine/core/styles.css';
import {FaChevronDown} from "react-icons/fa6";
import '@mantine/core/styles/global.css';
import Preloader from "../Preloader/Preloader";


const Filter = ({genresData, genresLoading, genresError, years, setFilters, filters, handleReset}) => {

    if (genresLoading) return <Preloader/>;
    if (genresError) return <div>Error: {genresError.message}</div>;


    return (
        <div className={s.filterContainer}>
            <MantineProvider>
                <div className={s.filterBlock}>
                    <div>
                        <span>Genres</span>
                        <MultiSelect
                            classNames={s}
                            className={`${s.longInput}`}
                            data={Array.isArray(genresData?.genres) ? genresData.genres.map(i => ({
                                value: String(i.id),
                                label: i.name
                            })) : []}
                            searchable
                            hidePickedOptions
                            value={filters.selectedGenre}
                            onChange={(value) => setFilters({...filters, selectedGenre: value})}
                            placeholder="Select genre"
                            rightSection={<FaChevronDown/>}
                        />

                    </div>
                    <div>
                        <span>Release year</span>
                        <Select
                            classNames={s}
                            data={years}
                            searchable
                            hidePickedOptions
                            value={filters.selectedYear}
                            onChange={(value) => setFilters({...filters, selectedYear: value})}
                            placeholder="Select release year"
                            rightSection={<FaChevronDown/>}
                        />

                    </div>

                    <div>
                        <span>Ratings</span>
                        <div className={s.numberInputGroup}>
                            <NumberInput
                                classNames={s}

                                className={s.shortInput}
                                min={0}
                                max={10}
                                placeholder="From"
                                value={filters.numberFrom}
                                onChange={(value) => setFilters({...filters, numberFrom: value})}
                            />
                            <NumberInput
                                classNames={s}
                                className={s.shortInput}
                                min={0}
                                max={10}
                                placeholder="To"
                                value={filters.numberTo}
                                onChange={(value) => setFilters({...filters, numberTo: value})}
                            />
                        </div>
                    </div>
                    <div>
                        <div style={{visibility: "hidden"}}>s</div>
                        <button className={s.resetButton} onClick={handleReset}>
                            Reset filters
                        </button>
                    </div>
                </div>
                <div className={s.sort}>
                    <div>
                        <span>Sort by</span>
                        <Select
                            classNames={s}
                            className={s.longInput}
                            data={[
                                {value: 'original_title.asc', label: 'Title'},
                                {value: 'original_title.desc.asc', label: 'Description'},
                                {value: 'popularity.desc', label: 'Popularity'},
                                {value: 'primary_release_date.asc', label: 'Primary release'},
                                {value: 'vote_average.asc', label: 'Vote average'},
                                {value: 'vote_count.asc', label: 'Vote count'},
                            ]}
                            value={filters.sortBy}
                            onChange={(value) => setFilters({...filters, sortBy: value})}
                            placeholder="Sort by"
                            rightSection={<FaChevronDown/>}
                        />
                    </div>
                </div>
            </MantineProvider>

        </div>
    );
};

export default Filter;
