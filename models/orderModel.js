const { Schema, model } = require("mongoose");


const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      cover: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    },
  ],
  orderAddress: {
    address: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: Number, required: true },
    city: { type: String, required: true },
  },
  additionalPrices: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email: { type: String },
    phone: { type: String }
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
}, {
  timestamps: true
})

module.exports.Order = model("Order", orderSchema);