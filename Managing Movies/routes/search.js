var express = require("express");
var router = express.Router();
const moviesBL = require("../models/moviesBL");

/* GET search listing. */
router.get("/", async function (req, res, next) {
  // Check if user not Logged-in
  if (req.session.isLogged != true) {
    // If not, send user to login page
    return res.status(401).render("login");
  } else {
    // Check if the Logged-in user is Admin user
    if (req.session.isAdmin === true) {
      // Check if Admin has null as a number of transactions
      if (req.session.transactions == null) {
        // Render search page
        return res.status(200).render("search");
      }
    }
    // Check if Admin has as a number of transactions more than 0
    if (req.session.transactions > 1) {
      // If transactions is equal to 0, take one transaction down
      req.session.transactions--;
      // Render search page
      return res.status(200).render("search");
    } else {
      // If transactions is 0, send user to login page
      return res.status(401).render("login");
    }
  }
});

/* GET search results. */
router.post("/results", async function (req, res, next) {
  // Check if user not Logged-in
  if (req.session.isLogged != true) {
    // If not, send user to login page
    return res.status(401).redirect("/login");
  } else {
    // Take the movie characters the user want to search the movie by from the body
    const movieObj = req.body;
    // Turn to the getMovies function from the moviesDAL
    // to get all movies from the API
    const moviesFromAPI = await moviesBL.getMovies();
    // Turn to the getMoviesFromJSonFile function from the moviesDAL
    // to get all movies from the Json file
    const moviesFromFile = await moviesBL.getMoviesFromFile();
    // Insert the moviesFromFile into the moviesFromAPI array
    const movieList = moviesFromAPI.concat(moviesFromFile);

    // Check if Admin has null as a number of transactions
    if (req.session.transactions == null) {
      // Turn to the filterMovies function from the moviesDAL
      const filteredMovies = moviesBL.filterMovies(movieObj, movieList);

      // Check if Admin not field at least one of the search fields
      if (!movieObj.name && !movieObj.genres && !movieObj.language) {
        // If user not field at least one of the search fields,
        // render message page ("Please Enter a Value at Least in one Search Field")
        return res.status(400).render("message");
      }
      // Render resultsOfSearch page with filteredMovies that will represent in the left column
      // and movieList suggestions of movies of the same genres in the right column
      return res.status(200).render("resultsOfSearch", {
        leftColumnMovies: filteredMovies,
        rightColumnMoviesByGenre: movieList,
      });
    }
    // Check if Admin has as a number of transactions more than 0
    if (req.session.transactions > 1) {
      // Turn to the filterMovies function from the moviesDAL
      const filteredMovies = moviesBL.filterMovies(movieObj, movieList);

      // Check if user not field at least one of the search fields
      if (!movieObj.name && !movieObj.genres && !movieObj.language) {
        // If transactions is equal to 0, take one transaction down
        req.session.transactions--;
        // If user not field at least one of the search fields,
        // render message page ("Please Enter a Value at Least in one Search Field")
        return res.status(400).render("message");
      }
      // If transactions is equal to 0, take one transaction down
      req.session.transactions--;
      // Render resultsOfSearch page with filteredMovies that will represent in the left column
      // and movieList suggestions of movies of the same genres in the right column
      return res.status(200).render("resultsOfSearch", {
        leftColumnMovies: filteredMovies,
        rightColumnMoviesByGenre: movieList,
      });
    }
  }
});

/* GET movie details. */
router.get("/results/:id", async function (req, res, next) {
  // Get the movie id from the params
  const id = req.params.id;
  try {
    // Turn to the getOneMovie function from the moviesBL to get one movie from the API
    const movieData = await moviesBL.getOneMovie(id);
    // Render movieDetails page with movie details
    return res.render("movieDetails", {
      movie: movieData,
    });
  } catch (e) {
    // If movie do not exist in the API
    // turn to getOneMovieFromFile function from the moviesBL to get the movie from the Json file
    const movieDataFromFile = await moviesBL.getOneMovieFromFile(id);
    // Render movieDetails page with movie details
    return res.render("movieDetails", {
      movie: movieDataFromFile,
    });
  }
});

module.exports = router;
