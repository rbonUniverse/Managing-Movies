var express = require("express");
var router = express.Router();
const userBL = require("../models/usersBL");

/* GET management listing. */
router.get("/", async function (req, res, next) {
  /* NEW, get session data to check if a user is logged in or not */
  if (req.session.isLogged != true) {
    // If not, send user to login page
    return res.status(401).render("login");
  } else {
      // Check if the Logged-in user is Admin user
      if (req.session.isAdmin === true) {
        // Check if Admin has null as a number of transactions
        if (req.session.transactions == null) {
          // Redirect to management
          return res.status(200).render("userDataPage");
          // If Admin transactions is not null, send Admin to login page
        } else {
          return res.status(401).redirect("/login");
        }
        // If the user is not Admin, send user to login page
      } else {
        return res.status(401).redirect("/login");
      }
  }
});

/* POST user listing. */
router.post("/", async function (req, res, next) {
  /* NEW, get session data to check if a user is logged in or not */
  if (req.session.isLogged != true) {
    // If not, send user to login page
    return res.status(401).render("login");
  } else {
      // Check if the Logged-in user is Admin user
      if (req.session.isAdmin === true) {
        // Check if Admin has null as a number of transactions
        if (req.session.transactions == null) {
          // Get the user details from the body, to add new user
          let obj = req.body;
          // Turn to the addNewUser function from the userBL to add user to the Json file
          await userBL.addNewUser(obj);
          // Redirect to management
          return res.status(201).redirect("/management");
          // If Admin transactions is not null, send user to login page
        } else {
          return res.status(401).redirect("/login");
        }
        // If the user is not Admin, send user to login page
      } else {
        return res.status(401).redirect("/login");
      }
  }
});

module.exports = router;
