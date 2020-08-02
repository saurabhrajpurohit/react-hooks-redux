//Core react Components
import React from 'react';

//Material UI Components
import { Button } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';


/**
 * This funciton is to show the movies list based on the movies array passed in props.
 */
export default function MovieList(props) {
    const classes = props.className;
    const length = props.movies.length;

    return (length > 0 ?
        <>
            {props.movies.map((movie) => (
                <ButtonBase
                    focusRipple
                    key={movie.Title}
                    className={classes.movie}
                    focusVisibleClassName={classes.focusVisible}
                >
                    <span
                        className={classes.movieSrc}
                        style={{
                            backgroundImage: `url(${movie.Poster})`,
                        }}
                    />
                    <span className={classes.movieBackdrop} />
                    <span className={classes.movieButton}>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.movieTitle}
                        >
                            {movie.Title}<br />
                            <span className={classes.movieMarked} >{movie.Year}</span>
                        </Typography>
                    </span>
                    <span className={classes.actionButtons}>
                        {props.bottomNavigation(movie)}
                    </span>
                </ButtonBase>
            ))}
            {!props.isUserList ?
                <Button variant="contained" onClick={props.loadMore} color="primary">
                    Load More...
                </Button>
                : null} </> :
        <div className={classes.noDataFound}>
            {!props.isUserList ? "Sorry, we are unable to get any movies right now. Please try again after sometime." :
                <div>Hey there! You havn't added any movies. Try to add <a href="/" >From Here.</a></div>}
        </div>
    );
}
