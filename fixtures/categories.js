const data = require('./db.json');

const categories = {};

for (const category of data.categories) {
  if (category.count === 0) continue;
  
  categories[category.id] = {
    slug: category.id,
    title: category.title,
    subcategories: [],
  };
}

for (const subcategory of data.subcategories) {
  if (!categories[subcategory.category]) continue;
  if (subcategory.count === 0) continue;
  
  categories[subcategory.category].subcategories.push({
    slug: subcategory.id,
    title: subcategory.title,
  });
}

module.exports = Object.keys(categories)
  .filter(slug => categories[slug].subcategories.length !== 0)
  .map(slug => {
    return {
      title: categories[slug].title,
      slug: slug,
      subcategories: categories[slug].subcategories,
    };
  });
