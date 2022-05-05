const { uploadImage, uploadVideo } = require("../utils/fileHandler");

const products_covers_path = process.env.PRODUCTS_COVERS_PATH || "public/upload/products/covers";
const products_images_path = process.env.PRODUCTS_IMAGES_PATH || "public/upload/products/images";
const products_videos_path = process.env.PRODUCTS_VIDEOS_PATH || "public/upload/products/videos";

// Product data
const uploadPCover = uploadImage(products_covers_path).single("cover");
const uploadPImages = uploadImage(products_images_path).array("images", 3);
const uploadPVideo = uploadVideo(products_videos_path).single("video");


module.exports = {
    //product
    uploadPCover,
    uploadPImages,
    uploadPVideo,
}
