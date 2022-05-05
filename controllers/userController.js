const {User} = require("../models/userModel");
const {generateToken}  = require("../utils/tokenGenerator.js");
const asyncHandler = require("express-async-handler");
const {handlePathError} = require("../middlewares/errMiddleware.js");

// authentificate user
// return user without password and jwt token
const authUser = asyncHandler(async (req, res)=>{
    if(Object.keys(req.body).length && req.body.email.length && req.body.password.length) {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user && (await user.matchPassword(password))) {
            res.status(200)
               .json({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(401).json({error: "Incorrect email or password"});
            throw new Error("Incorrect email or password");
        }

    }
    else {
        res.status(400).json({error: "Empty Request"});
        throw new Error("Empty Request");
    }
});

// create new user
// return user without password and jwt token
const createUser = asyncHandler(async (req, res)=>{
    if(Object.keys(req.body).length) {
        const data = {
            first_name,
            last_name,
            email,
            password
        } = req.body;
        const userExists = await User.findOne({email});
        if(userExists) {
            res.status(400).json({error: "User already exists"});
            throw new Error("User already exists");
        }
        else {
            try {
                const user = await User.create(data);
                res.status(200).json({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    token: generateToken(user._id)
                })
            }
            catch(err){
                console.log(err);
                res.status(400).json({error: "Invalid user data"});
                throw new Error("Invalid user data");
            }
        }
    }
    else {
        res.status(400).json({error: "Empty request"});
        throw new Error("Empty Request");
    }
});


// @desc get user 'profile' informations using token
// @route GET/api/user
// @access Private
const getUser = asyncHandler(async (req, res)=> {
    try {
        let user = await User.findById(req.user._id);
        const {first_name, last_name, email, password} = user;
        if(user) {
            res.json({
                user: {first_name, last_name, email}
            })
        }
        else {
            res.status(404).json({error: "User not found"});
            throw new Error("User not found");
        }
    }
    catch(error) {
        res.status(400).json({error: "Invalid user id"});
        throw new Error(error);
    }
});

// update user 'profile' informations using token
// return updated user without password
const updateUser = asyncHandler(async (req, res) => {
    if(Object.keys(req.body).length) {
        const user = await User.findById(req.params.id);
        if(user) {
            user.first_name = req.body.first_name || user.first_name;
            user.last_name = req.body.last_name || user.last_name;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;

            try {
                const {first_name, last_name, email} = await user.save();
                if(updateUser) {
                    res.status(200).json({
                        updatedUser: {first_name, last_name, email}
                    });
                }
                else {
                    res.status(400).json({error: "Invalid user data"});
                    throw new Error("Invalid user data");
                }
            }
            catch(error) {
                res.status(400).json({error: handlePathError(error)})
                throw new Error(error);
            }            
        }
        else {
            res.status(404).json({error: "User not found"});
            throw new Error("User not found")
        }

    }
    else {
        res.status(401).json({error: "Empty Request"});
        throw new Error("Empty Request");
    }
});


// delete user 'profile' using token
// return deleted user without password
const deleteUser = asyncHandler(async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(user) {
            const deletedUser = user.remove();
            if(deletedUser) {
                res.status(200).json(user);
            }
            else {
                res.status(401).json({error: "Error deleting user"});
                throw new Error("Error deleting user");
            }
        }
        else {
            res.status(404).json({error: "User not found"});
        }
    }
    catch(error) {
        res.status(401).json({error: "Invalid user id"});
        throw new new Error(error.message);
    }
});

// get user by id using @params id
// return user without password

const getUserById = asyncHandler(async (req, res)=>{
    try {
        const user = await User.findById(req.params.id).select("-password");
        if(user) {
            res.status(200).json(user);
        }
        else {
            res.status(401).json({error: "User not found"});
            throw new Error("User not found");
        }
    }
    catch(error) {
        res.status(400).json({error: "Invalid user id"});
        throw new Error(error.message);
    }
})

// get users
// return user without password
const getUsers = asyncHandler(async (req, res)=>{
    const users = await User.find().select("-password");
    if(users) {
        res.status(200).json(users);
    }
    else {
        res.status(401).json({error: "No user found"});
    }
});

module.exports = {
    authUser,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getUserById,
    getUsers
}