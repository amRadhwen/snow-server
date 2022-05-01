const { uploadImage, uploadVideo } = require("../utils/fileHandler");

// Product data
const uploadPCover = uploadImage(process.env.PRODUCTS_COVERS_PATH).single("cover");
const uploadPImages = uploadImage(process.env.PRODUCTS_PICTURES_PATH).array("images", 3);
const uploadPVideo = uploadVideo(process.env.PRODUCTS_VIDEOS_PATH).single("video");


module.exports = {
    //product
    uploadPCover,
    uploadPImages,
    uploadPVideo,
}