module.exports = function mapProduct(product) {
  return {
    id: product.slug,
    title: product.title,
    images: product.images,
    category: product.category,
    subcategory: product.subcategory,
    price: product.price,
    discount: product.discount,
    description: product.description,
    details: product.details,
    rating: product.rating,
    reviews: product.reviews,
  };
};
