var express = require("express");
var router = express.Router();

/* GET menu listing. */
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
          // If yes, render menu page with Admin role
          return res.status(200).render("menu", { role: "Admin" });
        } else {
          // If Admin has no null transactions, render the login page
          return res.status(401).render("login");
        }
      }
      // Check if user has number of transactions above 0
      if (req.session.transactions > 1) {
        // If user has more than 0 action of navigation in the web site take one down
        req.session.transactions--;
        // Render menu page with Admin role
        return res.status(200).render("menu", { role: "user" });
      } else {
        // If transactions is equal to 0, send user to login page
        return res.status(401).render("login");
      }
  }
});

module.exports = router;
