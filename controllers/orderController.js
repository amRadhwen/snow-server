const {Order} = require('../models/orderModel.js');
const asyncHandler = require('express-async-handler');

// @desc 
// @route   POST/api/orders
// @access  private

const addOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        orderAddress,
        additionalPrices,
        totalPrice
    } = req.body;

    const user = req.user._id;

    if (orderItems && orderItems.length == 0) {
        res.status(400);
        throw new Error('No order Items');
        return;
    } else {
        const order = new Order({
            user,
            orderItems,
            orderAddress,
            additionalPrices,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found!');
    }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email: req.body.payer.email_address,
            phone: req.body.payer.phone
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found!');
    }
});

// @desc    get logged in user orders
// @route    GET/api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})


// @desc    get all orders
// @route    GET/api/orders/
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', ' id name')
    res.json(orders)
})


// @desc get logged in user order by id
// @route GET/api/orders/myorders/:id
// @access Private
const getMyOrderById = asyncHandler(async (req, res) => {
    const orders = await Order.findById({_id: req.params.id, user: req.user._id}).populate('user', ' id name')
    res.json(orders)
})

// @desc    update order to delivred
// @route    GET/api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivred = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivred = true
        order.delivredAt = Date.now()

        const updateOrder = await order.save()
        res.json(updateOrder)
    } else {
        res.status(404)
        throw new Error('order not found')
    }
})


module.exports = {
    addOrder,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getMyOrderById,
    getOrders,
    updateOrderToDelivred
}