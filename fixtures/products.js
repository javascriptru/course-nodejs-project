const range = require('lodash/range');
const random = require('lodash/random');
const products = require('../data/products.json');
const transliterate = require('./transliterate');

const _reviews = [
  {rating: 1, text: 'Абсолютно ужасный товар, никому не рекоммендую!', author: 'Злой Василий'},
  {rating: 2, text: 'Товар пришлось вернуть через неделю использования.', author: 'Недовольный Артём'},
  {rating: 3, text: 'Совершенно не подошел по характеристикам.', author: 'Умеренный Иван'},
  {rating: 4, text: 'Очень хороший и качественный товар, но сильно пачкается', author: 'Довольный Сергей'},
  {rating: 5, text: 'Самый лучший товар в этой категории, всем горячо рекоммендую', author: 'Счастливый Илья'},
];

module.exports = products.map(product => {
  const low = random(0, 3);
  const high = low + 1;
  const reviews = range(random(3, 6)).map(_ => _reviews[random(low, high)]);
  const rating = Math.round(reviews.reduce((a, r) => a + r.rating, 0) / reviews.length);
  
  const price = parseInt(product.price);
  // we want in 33% cases give discount from 10% up to 38%
  const discount = Math.random() > 0.66
    ? price - (price * ((Math.floor(Math.random() * (38 - 10)) + 10) / 100))
    : null;

  return {
    ...product,
    slug: transliterate(product.title.toLowerCase().replace(/ |\//g, '-')),
    price,
    discount,
    description: product.description,
    details: product.details,
    reviews,
    rating,
  }
});
