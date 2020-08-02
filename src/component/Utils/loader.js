import React, { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: 25,
        minWidth: 300,
        padding: theme.spacing(2),
    },
    skeleton: {
        height: 350,
        margin: theme.spacing(2),
        width: 250,
    }
}));

/**
 * This is skeleton loader created show at the time of API call
 * @param {*} props 
 */
export default function Loader(props) {
    const classes = useStyles();
    const { length } = props;

    return (
        <div className={classes.root}>
            {Array.from(new Array(length)).map((item, index) => (
                <Skeleton variant="rect" className={classes.skeleton} />
            ))}
        </div>
    );
}

