const Router = require ("express").Router();

const {protectAdmin, protectUser} = require("../middlewares/authMiddleware");

const {
    uploadProductCover,
    uploadProductImages,
    uploadProductVideo
} = require("../controllers/uploadController");

Router.post("/product/cover", uploadProductCover);
Router.post("/product/images", uploadProductImages);
Router.post("/product/video", uploadProductVideo);


module.exports = Router;