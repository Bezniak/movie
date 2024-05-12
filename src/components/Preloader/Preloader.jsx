import React from 'react';
import s from './Preloader.module.css';
import {Loader, MantineProvider} from "@mantine/core";

const Preloader = () => {
    return (
        <div className={s.preloaderContainer}>
            <MantineProvider>
                <Loader color="grape" size="xl" type="dots"/>
            </MantineProvider>
        </div>
    );
};

export default Preloader;