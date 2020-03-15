module.exports = function mapCategory(category) {
  return {
    id: category.id,
    title: category.title,
    slug: category.slug,
    subcategories: category.subcategories.map((subcategory) => ({
      id: subcategory.id,
      title: subcategory.title,
      slug: subcategory.slug,
    })),
  };
};
