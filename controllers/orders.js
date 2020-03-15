const Order = require('../models/Order');
const Product = require('../models/Product');
const mapOrder = require('../mappers/order');

module.exports.checkout = async function checkout(ctx, next) {
  const product = await Product.findOne({slug: ctx.request.body.product});
  
  const order = await Order.create({
    user: ctx.user,
    product: product,
    phone: ctx.request.body.phone,
    address: ctx.request.body.address,
  });

  ctx.body = {order: order.id};
};

module.exports.ordersList = async function ordersList(ctx) {
  const orders = await Order.find({user: ctx.user}).limit(20).populate('product');
  ctx.body = {orders: orders.map(mapOrder)};
};
