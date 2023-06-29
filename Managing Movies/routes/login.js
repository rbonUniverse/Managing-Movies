var express = require("express");
var router = express.Router();
const usersData = require("../models/usersBL");

/* GET login page. */
router.get("/", function (req, res) {
  return res.render("login");
});

/* POST login page. */
router.post("/", async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  const respArr = await usersData.getUsersData();
  const userObjectFromFile = respArr.find(
    (u) => u.username === username && u.password === password
  );
  if (
    userObjectFromFile &&
    userObjectFromFile.username &&
    userObjectFromFile.password
  ) {
    if (
      username === userObjectFromFile.username &&
      password === userObjectFromFile.password
    ) {
      if (respArr.length >= 0) {
        if (username === "Admin") {
          req.session.isAdmin = true;
          req.session.isLogged = true;
          const Admin = respArr.find((singleUser) => singleUser.id == 0);
          req.session.transactions = Admin.numberOfTransactions;
          return res.render("menu", { role: "Admin" });
        }
        req.session.isLogged = true;
        const user = respArr.find((singleUser) => singleUser.id);
        req.session.transactions = user.numberOfTransactions;
        return res.render("menu", { role: "user" });
      } else {
        return res.send("Please enter username or password");
      }
    } else {
      return res.send("Incorrect username or password");
    }
  } else {
    return res.send("Incorrect username or password");
  }
});

module.exports = router;
