const usersJFile = require("../DALs/usersJFile");

// GET users data
const getUsersData = async () => {
  const respUsers = await usersJFile.getUsersFromFile();
  return respUsers;
};

// GET user data
const getUserData = async (id) => {
  const respUsers = await usersJFile.getUsersFromFile();
  let userData = respUsers.find((u) => u.id == id);
  return userData;
};

// ADD new user
const addNewUser = async (obj) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = dd + "/" + mm + "/" + yyyy;

  const usersData = await getUsersData();
  let usersDataId = usersData.map((u) => u.id);
  let maxNumOfIdInUsersArray = Math.max(...usersDataId);

  obj.id = maxNumOfIdInUsersArray + 1;
  obj.numberOfTransactions = 10;
  obj.dateCreated = formattedToday;
  const addedUser = await usersJFile.writeUserToFile(obj);
  return addedUser;
};

// Update user
const updateUser = async (id, obj) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = dd + "/" + mm + "/" + yyyy;

  obj.id = +id;
  obj.numberOfTransactions = 10;
  obj.dateCreated = formattedToday;
  const updatedUser = await usersJFile.updateUserToFile(id, obj);
  return updatedUser;
};

// DELETE user
const deleteUser = async (Id) => {
  await usersJFile.deleteUserFromFile(Id);
};

module.exports = {
  getUsersData,
  addNewUser,
  updateUser,
  getUserData,
  deleteUser,
};
