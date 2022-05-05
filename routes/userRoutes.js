const Router = require("express").Router();
const {
    authUser,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getUserById,
    getUsers
} = require("../controllers/userController");
const {protectUser, protectAdmin} = require("../middlewares/authMiddleware");

// normal user and admin user operations
Router.route("/")
    .get(protectUser, getUser)
    .put(protectUser, updateUser)
    .post(createUser)
    
Router.route("/auth").post(authUser);


// only admin user
Router.route("/users")
    .get(protectAdmin, getUsers)
    .post(protectAdmin, createUser);

Router.route("/users/:id")
    .get(protectAdmin, getUserById)
    .put(protectAdmin, updateUser)
    .delete(protectAdmin, deleteUser);


module.exports = Router;