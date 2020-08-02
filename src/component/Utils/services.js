const baseUrl = process.env.REACT_APP_OMDB_BASE_URL;
const apiKey = process.env.REACT_APP_OMDB_API_KEY;

/**
 * Creates OMDB URL based on year and page no.
 * @param {*} page 
 * @param {*} year 
 */
function constructUrl(page, year) {
    return `${baseUrl}?apikey=${apiKey}&type=movie&s=bad&page=${page}&y=${year}`;
}

/**
 * API Call is done via this function
 * @param {*} page 
 * @param {*} year 
 */
export function fetchMovies(page, year) {
   let url = constructUrl(page, year);
   return fetch(url).then(response => response.json());
}