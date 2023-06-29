const moviesDAL = require("../DALs/movieDAL");

// GET movies
const getMovies = async () => {
  // Turn to the getAllMoviesFromServer function from the moviesDAL to get all movies from the API
  const resp = await moviesDAL.getAllMoviesFromServer();
  // Screen out all the data accept the movies details data
  const movies = resp.data;
  // Return movies
  return movies;
};

// GET movies from file
const getMoviesFromFile = async () => {
  // Turn to the getMoviesFromJSonFile function from the moviesDAL
  // to get all movies from the Json file
  return await moviesDAL.getMoviesFromJSonFile();
};

//GET one movie
const getOneMovie = async (movieId) => {
  // Turn to the getMovieFromServer function from the moviesDAL
  // to get single movie from the API
  const resp = await moviesDAL.getMovieFromServer(movieId);
  // Screen out all the data accept the movie details data
  const movie = resp.data;
  // Return movie
  return movie;
};

const getOneMovieFromFile = async (movieId) => {
  // Turn to the getMoviesFromJSonFile function from the moviesDAL
  // to get all movies from the Json file
  const resp = await moviesDAL.getMoviesFromJSonFile();
  // Find one movie from the Json file by id
  const movie = resp.find((m) => m.id == movieId);
  // Return movie
  return movie;
};

// ADD movie
const addMovie = async (obj) => {
  // Turn to the getMoviesFromJSonFile function from the moviesDAL
  // to get all movies from the Json file
  const moviesData = await moviesDAL.getMoviesFromJSonFile();
  // Map over the movies array to get all the movies ids
  let moviesDataId = moviesData.map((u) => u.id);
  // Find the last id in the movies array in the json file
  let maxNumOfIdInMoviesArray = Math.max(...moviesDataId);
  // The added movie will get the id of the last movie in the array +1
  obj.id = maxNumOfIdInMoviesArray + 1;
  // Turn to the writeMovieToFile function from the moviesDAL
  // to add the movie to the movies Json file
  const addedMovie = await moviesDAL.writeMovieToFile(obj);
  // Return added movie
  return addedMovie;
};

// Filter Movies
function filterMovies(movieObj, movieList) {
  // Make new object
  let filteredMovies;
  // If the search has been made by feeling only the search bar
  // and find the relevant movies according to this
  if (movieObj.name && !movieObj.genres && !movieObj.language) {
    filteredMovies = movieList.filter((m) =>
      m.name.toLowerCase().includes(movieObj.name.toLowerCase())
    );
  }
  // If the search has been made only by choosing genres options
  // and find the relevant movies according to this
  if (!movieObj.name && movieObj.genres && !movieObj.language) {
    filteredMovies = movieList.filter((m) =>
      m.genres.find((g) => g == movieObj.genres)
    );
  }
  // If the search has been made only by choosing languages options
  // and find the relevant movies according to this
  if (!movieObj.name && !movieObj.genres && movieObj.language) {
    filteredMovies = movieList.filter((m) => m.language == movieObj.language);
  }
  // If the search has been made by feeling the search bar and by choosing genre
  // and find the relevant movies according to this
  if (movieObj.name && movieObj.genres && !movieObj.language) {
    let filterByName = movieList.filter((m) =>
      m.name.toLowerCase().includes(movieObj.name.toLowerCase())
    );
    filteredMovies = filterByName.filter((m) =>
      m.genres.find((g) => g == movieObj.genres)
    );
  }
  // If the search has been made by feeling the search bar and by choosing language
  // and find the relevant movies according to this
  if (movieObj.name && !movieObj.genres && movieObj.language) {
    let filterByName = movieList.filter((m) =>
      m.name.toLowerCase().includes(movieObj.name.toLowerCase())
    );
    filteredMovies = filterByName.filter(
      (m) => m.language == movieObj.language
    );
  }
  // If the search has been made by choosing genre and by choosing language
  // and find the relevant movies according to this
  if (!movieObj.name && movieObj.genres && movieObj.language) {
    let filterByGenre = movieList.filter((m) =>
      m.genres.find((g) => g == movieObj.genres)
    );
    filteredMovies = filterByGenre.filter(
      (m) => m.language == movieObj.language
    );
  }
  // If the search has been made by feeling the search bar and choosing genre and by choosing language
  // and find the relevant movies according to this
  if (movieObj.name && movieObj.genres && movieObj.language) {
    let filterByName = movieList.filter((m) =>
      m.name.toLowerCase().includes(movieObj.name.toLowerCase())
    );
    let filterByGenre = filterByName.filter((m) =>
      m.genres.find((g) => g == movieObj.genres)
    );
    filteredMovies = filterByGenre.filter(
      (m) => m.language == movieObj.language
    );
  }
  // Return filtered movies according to the parameters that the user entered
  return filteredMovies;
}

module.exports = {
  getMovies,
  getMoviesFromFile,
  getOneMovieFromFile,
  getOneMovie,
  addMovie,
  filterMovies,
};
