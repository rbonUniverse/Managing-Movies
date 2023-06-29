const axios = require("axios");
const JFile = require("jsonfile");

//GET All movies from Web Service
const getAllMoviesFromServer = () => {
  return axios.get("https://api.tvmaze.com/shows");
};

//GET One movie from Web Service
const getMovieFromServer = (id) => {
  return axios.get(`https://api.tvmaze.com/shows/${id}`);
};

// GET All Movies from File
const getMoviesFromJSonFile = () => {
  return new Promise((resolve, reject) => {
    JFile.readFile("./data/newMovies.json", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.movies);
      }
    });
  });
};

// ADD new Movie to File
const writeMovieToFile = (obj) => {
  return new Promise((resolve, reject) => {
    JFile.readFile("./data/newMovies.json", function (err, data) {
      if (err) {
        reject(console.log(err));
      } else {
        let arr = data.movies;
        arr.push(obj);

        let newMovieData = { movies: arr };

        resolve(
          JFile.writeFile("./data/newMovies.json", newMovieData, function (err) {
            if (err) {
              reject(console.log(err));
            } else {
              console.log("Created !!!");
            }
          })
        );
      }
    });
  });
};

module.exports = {
  getAllMoviesFromServer,
  getMovieFromServer,
  getMoviesFromJSonFile,
  writeMovieToFile
};
