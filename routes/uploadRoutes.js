const Router = require ("express").Router();

const {protectAdmin} = require("../middlewares/authMiddleware");

const {
    uploadProductCover,
    uploadProductImages,
    uploadProductVideo
} = require("../controllers/uploadController");

Router.post("/product/cover", protectAdmin, uploadProductCover);
Router.post("/product/images", protectAdmin, uploadProductImages);
Router.post("/product/video", protectAdmin, uploadProductVideo);


module.exports = Router;