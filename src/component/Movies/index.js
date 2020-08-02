//Core react components
import React, { useEffect, useState } from 'react';

//Material UI Components
import { Button } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

//Material UI Icons
import RestoreIcon from '@material-ui/icons/Restore';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Third party Libraries 
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

//Internal Developed Modules & Components
import { addMovieToWatchedList, addMovieToMyList, removeMovieFromWatchedList, removeMovieFromMyList, WATCHED_MOVIES, MY_LIST } from '../../redux/actions';
import { MoviesListDesign } from '../Utils/classes';
import { Years } from '../Utils/constants';
import { fetchMovies } from '../Utils/services';
import MovieList from '../Utils/moviesList';

function getYears() {
    return Years.map(year => (
        <MenuItem key={year} value={year}>{year}</MenuItem>
    ))
}

export default function Movies() {
    let history = useHistory();
    const classes = MoviesListDesign();
    const dispatch = useDispatch();
    const globalState = useSelector(state => state.state);

    const [page, setPage] = useState(1);
    const [year, setYear] = useState("");
    const [movies, setMovies] = useState([]);

    /**
     * When user selects a year from dropdown this method is invoked
     * @param {*} event 
     */
    function onYearChange(event) {
        const value = event.target.value;
        setYear(value);
        setMovies([]);
        getMovies(page, value, true);
    }

    /**
     * To load more movies
     * Gets invoked on Load more button click 
     */
    function loadMore() {
        let nextPage = page + 1;
        setPage(nextPage);
        getMovies(nextPage, year);
    }

    /**
     * To get movies based on page no, year
     * @param {*} nextPage 
     * @param {*} year 
     * @param {*} isYearChanged 
     */
    function getMovies(nextPage, year, isYearChanged) {

        fetchMovies(nextPage, year).then(response => {
            if(response.Response) {
                let movieList = [...movies, ...response['Search']];
                if(isYearChanged) {
                    movieList = response['Search'];
                }
                setMovies(movieList);
            }
        })
    }

    /**
     * Takes type and movie object as input and add/remove in/from redux state
     * @param {*} type 
     * @param {*} movie 
     */
    function addMovieToList(type, movie) {

        const existingType = getSelectedValue(movie.imdbID);
        if (existingType) {
            removeMovie(existingType, movie.imdbID)
        }

        if (type == MY_LIST) {
            dispatch(addMovieToMyList(movie));
        } else if (type == WATCHED_MOVIES) {
            dispatch(addMovieToWatchedList(movie));
        }
    }

    /**
     * To remove movie from redux state
     * @param {*} existingType 
     * @param {*} imdbID 
     */
    function removeMovie(existingType, imdbID) {
        if (existingType == MY_LIST) {
            dispatch(removeMovieFromMyList(imdbID));
        } else if (existingType == WATCHED_MOVIES) {
            dispatch(removeMovieFromWatchedList(imdbID));
        }
    }

    /**
     * Checks if selected movie is already present in redux state
     * @param {*} imdbID 
     */
    function getSelectedValue(imdbID) {
        if (Object.keys(globalState[WATCHED_MOVIES]).includes(imdbID)) {
            return WATCHED_MOVIES;
        } else if (Object.keys(globalState[MY_LIST]).includes(imdbID)) {
            return MY_LIST;
        }
    }

    /**
     * The Watch later and Watched Button in movie card
     * @param {*} movie 
     */
    function bottomNavigation(movie) {
        return <BottomNavigation
            showLabels
            value={getSelectedValue(movie.imdbID)}
            className={classes.navigationButtons}
            onChange={(event, newValue) => {
                addMovieToList(newValue, movie);
            }}
        >
            <BottomNavigationAction label="Watch Later" value={MY_LIST} icon={<RestoreIcon />} />
            <BottomNavigationAction label="Watched" value={WATCHED_MOVIES} icon={<VisibilityIcon />} />
        </BottomNavigation>
    }

    /**
     * Gets called on component load
     */
    useEffect(() => {
        getMovies(page, year);
    }, [])

    return (
        <div className={classes.root} id="movies-list">
            <Grid container spacing={2}>
                <Grid item xs>
                    <Button className={classes.redirectionButton} onClick={() => history.push("/userlist")} variant="outlined" color="primary">
                        Go to My List
                    </Button>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Filter By Year</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={year}
                            onChange={onYearChange}
                            label="Filter By Year"
                        >
                            {getYears()}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <MovieList movies={movies} loadMore={loadMore} isUserList={false} className={classes} addMovieToList={addMovieToList} getSelectedValue={getSelectedValue} bottomNavigation={bottomNavigation} />
        </div>
    );
}
