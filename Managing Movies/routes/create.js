var express = require("express");
var router = express.Router();
const moviesBL = require("../models/moviesBL");

/* GET movie listing. */
router.get("/", function (req, res, next) {
  // Check if user not Logged-in
  if (req.session.isLogged != true) {
    // If not, send user to login page
    return res.status(401).redirect("/login");
  } else {
    // Check if Admin has null as a number of transactions
    if (req.session.transactions == null) {
      // Render createNewMoviePage
      return res.status(200).render("createNewMoviePage");
    }
    // Check if user has number of transactions above 0
    if (req.session.transactions > 1) {
      // If user has more than 0 action of navigation in the web site take one down
      req.session.transactions--;
      // Render createNewMoviePage
      return res.status(200).render("createNewMoviePage");
      // If transactions is equal to 0, send user to login page
    } else {
      return res.status(401).redirect("/login");
    }
  }
});

/* POST movie listing. */
router.post("/", async function (req, res, next) {
  // Check if user not Logged-in
  if (req.session.isLogged != true) {
    // If not, send user to login page
    return res.status(401).redirect("/login");
  } else {
    // Check if Admin has null as a number of transactions
    if (req.session.transactions == null) {
      // Get the new movie details from the body (input)
      const obj = req.body;
      // Turn to the addMovie function from the moviesBL to add the show
      await moviesBL.addMovie(obj);
      // Redirect menu
      return res.status(201).redirect("/menu");
    }
    // Check if user has number of transactions above 0
    if (req.session.transactions > 1) {
      // Get the new movie details from the body (input)
      const obj = req.body;
      // If user has more than 0 action of navigation in the web site take one down
      req.session.transactions--;
      // Turn to the addMovie function from the moviesBL to add the show
      await moviesBL.addMovie(obj);
      // Redirect menu
      return res.status(201).redirect("/menu");
      // If transactions is equal to 0, send user to login page
    } else {
      return res.status(401).redirect("/login");
    }
  }
});

module.exports = router;
