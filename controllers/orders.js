const Order = require('../models/Order');
const Product = require('../models/Product');
const mapOrder = require('../mappers/order');
const sendMail = require('../libs/sendMail');
const config = require('../config');

module.exports.checkout = async function checkout(ctx, next) {
  const product = await Product.findOne({slug: ctx.request.body.product});
  
  const order = await Order.create({
    user: ctx.user,
    product: product,
    phone: ctx.request.body.phone,
    address: ctx.request.body.address,
  });
  
  await sendMail({
    to: {
      name: ctx.user.displayName,
      address: ctx.user.email,
    },
    subject: 'Подтверждение заказа',
    locals: {href: config.host, product: product.title, price: `${product.price}₽`},
    template: 'order',
  });

  ctx.body = {order: order.id};
};

module.exports.ordersList = async function ordersList(ctx) {
  const orders = await Order.find({user: ctx.user}).limit(20).populate('product');
  ctx.body = {orders: orders.map(mapOrder)};
};
