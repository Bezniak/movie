import React from 'react';
import {MantineProvider, Pagination} from "@mantine/core";
import s from "./Pagination.module.css";

const PaginationComp = ({total, activePage, setPage}) => {
    return (
        <MantineProvider>
            <Pagination
                value={activePage}
                color="#9854F6"
                onChange={setPage}
                total={total?.total_pages || 1}
                dotsIcon={() => null}
                className={s.dots}
            />
        </MantineProvider>
    );
};

export default PaginationComp;