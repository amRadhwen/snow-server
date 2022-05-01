const Router = require("express").Router();
const {
    addOrder,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getMyOrderById,
    getOrders,
    updateOrderToDelivred
} = require('../controllers/orderController');
const { protectUser, protectAdmin } = require("../middlewares/authMiddleware");

Router.route('/')
    .post(protectUser, addOrder)
    .get(protectAdmin, getOrders);

Router.route('/myorders').get(protectUser , getMyOrders)
Router.route('/myorders/:id').get(protectUser, getMyOrderById);
Router.route('/:id').get(protectAdmin, getOrderById);
Router.route('/:id/pay').put(protectAdmin, updateOrderToPaid);
Router.route('/:id/deliver').put(protectAdmin , updateOrderToDelivred);

export default Router;