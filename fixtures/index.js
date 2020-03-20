const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Order = require('../models/Order');
const connection = require('../libs/connection');
const users = require('./users');
const categories = require('./categories');
const products = require('./products');

(async () => {
  await User.deleteMany();
  await Category.deleteMany();
  await Product.deleteMany();
  await Order.deleteMany();

  for (const user of users) {
    const u = new User(user);
    await u.setPassword(user.password);
    await u.save();
  }

  for (const category of categories) {
    await Category.create(category);
  }

  for (const product of products) {
    await Product.create({
      title: product.title,
      slug: product.slug,
      description: product.description,
      details: product.details,
      price: product.price,
      discount: product.discount,
      subcategory: product.subcategory,
      images: product.images,
      rating: product.rating,
      reviews: product.reviews,
    });
  }


  connection.close();

  console.log(`${users.length} users have been saved in DB`);
  console.log(`${categories.length} categories have been saved in DB`);
  console.log(`${products.length} products have been saved in DB`);
})();
