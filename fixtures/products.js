const range = require('lodash/range');
const random = require('lodash/random');
const data = require('./db.json');

const _reviews = [
  {rating: 1, text: 'Абсолютно ужасный товар, никому не рекоммендую!', author: 'Злой Василий'},
  {rating: 2, text: 'Товар пришлось вернуть через неделю использования.', author: 'Недовольный Артём'},
  {rating: 3, text: 'Совершенно не подошел по характеристикам.', author: 'Умеренный Иван'},
  {rating: 4, text: 'Очень хороший и качественный товар, но сильно пачкается', author: 'Довольный Сергей'},
  {rating: 5, text: 'Самый лучший товар в этой категории, всем горячо рекоммендую', author: 'Счастливый Илья'},
];

module.exports = data.products.map(product => {
  const low = random(0, 3);
  const high = low + 1;
  const reviews = range(random(3, 6)).map(_ => _reviews[random(low, high)]);
  const rating = Math.round(reviews.reduce((a, r) => a + r.rating, 0) / reviews.length);
  
  const price = parseInt(product.price);
  
  return {
    title: product.title,
    slug: product.id,
    description: product.description,
    price,
    discount: product.discount || 0,
    subcategory: product.subcategory,
    images: product.images.slice(0, 5).map(img => img.url),
    rating,
    reviews,
    details: product.characteristics,
  }
});
