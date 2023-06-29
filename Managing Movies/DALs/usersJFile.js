const JFile = require("jsonfile");

// GET Users
const getUsersFromFile = () => {
  return new Promise((resolve, reject) => {
    JFile.readFile("./data/users.json", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.users);
      }
    });
  });
};

// ADD new User
const writeUserToFile = (obj) => {
  return new Promise((resolve, reject) => {
    JFile.readFile("./data/users.json", function (err, data) {
      if (err) {
        reject(console.log(err));
      } else {
        let arr = data.users;
        arr.push(obj);

        let newUserData = { users: arr };

        resolve(
          JFile.writeFile("./data/users.json", newUserData, function (err) {
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

// UPDATE new User
const updateUserToFile = (id, obj) => {
  return new Promise((resolve, reject) => {
    JFile.readFile("./data/users.json", function (err, data) {
      if (err) {
        reject(console.log(err));
      } else {
        let arr = data.users;
        arr.splice(id, 1, obj);

        let newUserData = { users: arr };

        resolve(
          JFile.writeFile("./data/users.json", newUserData, function (err) {
            if (err) {
              reject(console.log(err));
            } else {
              console.log("Updated !!!");
            }
          })
        );
      }
    });
  });
};

// DELETE User
const deleteUserFromFile = (id) => {
  return new Promise((resolve, reject) => {
    JFile.readFile("./data/users.json", function (err, data) {
      if (err) {
        reject(console.log(err));
      } else {
        let arr = data.users;
        let objIndex = arr.findIndex((o) => o == id);
        arr.splice(objIndex, 1);

        let newUserData = { users: arr };

        resolve(
          JFile.writeFile("./data/users.json", newUserData, function (err) {
            if (err) {
              reject(console.log(err));
            } else {
              console.log("Deleted !!!");
            }
          })
        );
      }
    });
  });
};

module.exports = {
  getUsersFromFile,
  writeUserToFile,
  updateUserToFile,
  deleteUserFromFile,
};
