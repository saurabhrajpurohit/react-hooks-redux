//Core react Components
import React, { useEffect, useState } from 'react';

//Material UI Components
import { Button } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Grid from '@material-ui/core/Grid';

//Material UI Icons
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Material UI Lab components
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

//Third Party Libraries
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

//Internal Developed Modules & Components
import { addMovieToWatchedList, removeMovieFromWatchedList, removeMovieFromMyList, REMOVE_FROM_WATCHED_MOVIES, WATCHED_MOVIES, MY_LIST, REMOVE_FROM_MY_LIST } from '../../redux/actions';
import { MoviesListDesign } from '../Utils/classes';
import MovieList from '../Utils/moviesList';


export default function UserList() {
  let history = useHistory();
  const classes = MoviesListDesign();
  const dispatch = useDispatch()
  const globalState = useSelector(state => state.state)
  const [userToggle, setUserToggle] = useState(MY_LIST);
  const [movies, setMovies] = useState([]);

  /**
   * Handle toggle event for Watch List and Watched List
   * @param {*} event 
   * @param {*} newValue 
   */
  function handleToggle(event, newValue) {
    setUserToggle(newValue);
    getMovies(newValue);
  }

  /**
   * Gets movie from redux state based on toggle valu i.e. Watched Movies or My List
   * @param {*} newValue 
   */
  function getMovies(newValue) {
    if (globalState[newValue]) {
      setMovies(Object.values(globalState[newValue]))
    } else {
      setMovies([]);
    }
  }

  /**
   * Adds or removes movie from redux state
   * @param {*} type 
   * @param {*} movie 
   */
  function addMovieToList(type, movie) {
    debugger
    switch (type) {
      case REMOVE_FROM_WATCHED_MOVIES:
        dispatch(removeMovieFromWatchedList(movie.imdbID));
        break;
      case REMOVE_FROM_MY_LIST:
        dispatch(removeMovieFromMyList(movie.imdbID))
        break;
      case WATCHED_MOVIES:
        dispatch(removeMovieFromMyList(movie.imdbID))
        dispatch(addMovieToWatchedList(movie));
        break;
      default:
        break;
    }

    getMovies(userToggle);
  }

  /**
   * The Watch later and Watched Button in movie card
   * @param {*} movie 
   */
  function bottomNavigation(movie) {
    return <BottomNavigation
      showLabels
      className={classes.navigationButtons}
      onChange={(event, newValue) => {
        addMovieToList(newValue, movie);
      }}
    >{userToggle !== WATCHED_MOVIES ?
      <BottomNavigationAction label="Watched" value={WATCHED_MOVIES} icon={<VisibilityIcon />} /> : null}
      <BottomNavigationAction label="Remove" value={userToggle === MY_LIST ? REMOVE_FROM_MY_LIST : REMOVE_FROM_WATCHED_MOVIES} icon={<DeleteIcon />} />
    </BottomNavigation>
  }

  /**
   * Gets called on component load
   */
  useEffect(() => {
    getMovies(userToggle);
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Button className={classes.goBackButton} onClick={() => history.push("/")} variant="outlined" color="primary">
            Go Back To Movie List
          </Button>
          <div>
            <ToggleButtonGroup value={userToggle} className={classes.toggleContainer} exclusive onChange={handleToggle}>
              <ToggleButton value={MY_LIST}>
                <RestoreIcon /> &nbsp; Watch List
              </ToggleButton>
              <ToggleButton value={WATCHED_MOVIES}>
                <VisibilityIcon /> &nbsp; Watched Movies
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Grid>
      </Grid>
      <MovieList movies={movies} isUserList={true} className={classes} addMovieToList={addMovieToList} bottomNavigation={bottomNavigation} />
    </div>
  );
}
