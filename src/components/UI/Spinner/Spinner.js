import React from 'react';
import classes from './Spinner.css';

const spinner = (props) => (
    <div className={classes.LoaderContainer}>
        <div className={classes.Loader}>Loading...</div>
    </div>
);

export default spinner;