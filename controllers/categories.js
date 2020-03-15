const Category = require('../models/Category');
const mapCategory = require('../mappers/category');

module.exports = async function categoryList(ctx) {
  const categories = await Category.find();
  ctx.body = {categories: categories.map(mapCategory)};
};
