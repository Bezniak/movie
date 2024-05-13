import React, {useState} from 'react';
import s from './Pagination.module.css';
import {MantineProvider, Pagination} from "@mantine/core";

const PaginationComponent = ({data, setActivePage, activePage}) => {

    const classes = {dots: s.dots};

    return (
        <MantineProvider>
            <Pagination total={data || 1}
                        activePage={activePage}
                        setPage={setActivePage}
                        onChange={setActivePage}
                        color="#9854F6"
                        className={s.lastElem}
                        classNames={{dots: classes.dots}}
            />
        </MantineProvider>
    );
};

export default PaginationComponent;