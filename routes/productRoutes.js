const Router = require("express").Router();
const {
	createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductById
} = require("../controllers/productController");
const { protectUser, protectAdmin } = require("../middlewares/authMiddleware");


Router.route("/")
	.get(getAllProducts)
	.post(protectAdmin, createProduct)

Router.route("/:id")
	.get(getProductById)
	.put(protectAdmin, updateProduct)
	.delete(protectAdmin, deleteProduct);

module.exports = Router;