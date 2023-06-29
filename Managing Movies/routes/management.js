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
        // Turn to the getUsersData function from the userBL to get the users from Json file
        let usersData = await userBL.getUsersData();
        // Redirect userManagementPage with users
        res.status(200).render("userManagementPage", { users: usersData });
        // If Admin transactions is not null, send user to login page
      }
      // If the user is not Admin, send user to login page
    } else {
      return res.status(401).redirect("/login");
    }
  }
});

/* GET user listing. */
router.get("/:id", async function (req, res, next) {
  /* NEW, get session data to check if a user is logged in or not */
  if (req.session.isLogged != true) {
    // If not, send user to login page
    return res.status(401).render("login");
  } else {
    // Check if the Logged-in user is Admin user
    if (req.session.isAdmin === true) {
      // Check if Admin has null as a number of transactions
      if (req.session.transactions == null) {
        // Get the user id from the params
        let id = req.params.id;
        // Turn to the getUserData function from the userBL to get single user from Json file
        let singleUser = await userBL.getUserData(id);
        // Redirect userManagementPage with single user details
        return res.status(200).render("updateUserData", { user: singleUser });
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

/* PUT user listing. */
router.post("/update/:id", async function (req, res, next) {
  /* NEW, get session data to check if a user is logged in or not */
  if (req.session.isLogged != true) {
    // If not, send user to login page
    return res.status(401).render("login");
  } else {
    // Check if the Logged-in user is Admin user
    if (req.session.isAdmin === true) {
      // Check if the user has transactions
      if (req.session.transactions) {
        // Check if Admin has null as a number of transactions
        if (req.session.transactions == null) {
          // Get the user id from the params
          let id = req.params.id;
          // Get the user details to update from the body (input)
          let obj = req.body;
          // Turn to the updateUser function from the userBL to update single user in Json file
          await userBL.updateUser(id, obj);
          // Redirect userManagementPage
          return res.status(200).redirect("/userManagementPage");
          // If Admin transactions is not null, send user to login page
        } else {
          return res.status(401).redirect("/login");
        }
        // If the user is not Admin, send user to login page
      } else {
        return res.status(401).redirect("/login");
      }
      // If Admin has no transactions, send user to login page
    } else {
      return res.status(401).redirect("/login");
    }
  }
});

/* DELETE user listing. */
router.post("/:id", async function (req, res, next) {
  /* NEW, get session data to check if a user is logged in or not */
  if (req.session.isLogged != true) {
    // If not, send user to login page
    return res.status(401).render("login");
  } else {
    // Check if the Logged-in user is Admin user
    if (req.session.isAdmin === true) {
      // Check if Admin has null as a number of transactions
      if (req.session.transactions == null) {
        // Get the user id from the params
        let id = req.params.id;
        // Turn to the deleteUser function from the userBL to delete single user from Json file
        await userBL.deleteUser(id);
        // Redirect menu
        return res.status(204).redirect("/menu");
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
