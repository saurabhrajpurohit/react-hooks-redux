export const MY_LIST = "MY_LIST";
export function addMovieToMyList(movie) {
    return {
        type: MY_LIST,
        value: movie
    }
}

export const WATCHED_MOVIES = "WATCHED_MOVIES";
export function addMovieToWatchedList(movie) {
    return {
        type: WATCHED_MOVIES,
        value: movie
    }
}

export const REMOVE_FROM_MY_LIST = "REMOVE_FROM_MY_LIST";
export function removeMovieFromMyList(movie) {
    return {
        type: REMOVE_FROM_MY_LIST,
        value: movie
    }
}

export const REMOVE_FROM_WATCHED_MOVIES = "REMOVE_FROM_WATCHED_MOVIES";
export function removeMovieFromWatchedList(movie) {
    return {
        type: REMOVE_FROM_WATCHED_MOVIES,
        value: movie
    }
}