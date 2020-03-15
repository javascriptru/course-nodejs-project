const Product = require('../models/Product');
const mapProduct = require('../mappers/product');

module.exports = async function recommendationsList(ctx) {
  const recommendations = await Product.aggregate(
    [
      { $match: { rating: 5 } },
      { $sample: { size: 6 } },
    ]
  );
  ctx.body = {recommendations: recommendations.map(mapProduct)};
};
