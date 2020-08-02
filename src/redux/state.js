import {
  WATCHED_MOVIES,
  MY_LIST,
  REMOVE_FROM_WATCHED_MOVIES,
  REMOVE_FROM_MY_LIST,
} from "./actions";

export default function state(
  state = { MY_LIST: {}, WATCHED_MOVIES: {} },
  action
) {
  switch (action.type) {
    case WATCHED_MOVIES:
      //Adds movie to the state
      let watchedMovies = state.WATCHED_MOVIES;
      watchedMovies[action.value.imdbID] = action.value;
      return {
        ...state,
        WATCHED_MOVIES: watchedMovies
      };
    case MY_LIST:
      //Adds movie to the state
      let movies = state.MY_LIST;
      movies[action.value.imdbID] = action.value;
      return {
        ...state,
        MY_LIST: movies
      };
    case REMOVE_FROM_WATCHED_MOVIES:
      //Removes movie from the state
      let removeWatchedMovies = state.WATCHED_MOVIES;
      delete removeWatchedMovies[action.value];
      return {
        ...state,
        WATCHED_MOVIES: removeWatchedMovies
      };
    case REMOVE_FROM_MY_LIST:
      //Removes movie from the state
      let removeWatchListMovies = state.MY_LIST;
      delete removeWatchListMovies[action.value];
      return {
        ...state,
        MY_LIST: removeWatchListMovies
      };
    default:
      return state;
  }
}
