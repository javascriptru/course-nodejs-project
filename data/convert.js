const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const transliterate = require('../server/fixtures/transliterate');

const files = fs.readdirSync(path.join(__dirname, 'original_data'));

const categories = {/*
  [title]: [...titles]
*/};

const products = {
  items: [/* {title, description, category, subcategory, images, price} */],
  titles: new Set(),/*
  [category]: {
    [subcategory]: count,
  },
*/};

for (const file of files) {
  console.log(`processing ${file} ...`);
  const workbook = XLSX.readFile(path.join(__dirname, 'original_data', file));
  const sheet_name = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheet_name];
  
  const items = XLSX.utils.sheet_to_json(worksheet);
  
  for (const product of items) {
    const category = product['Категория'];
    const subcategory = product['Подкатегория 2'];
  
    categories[category] = categories[category] || new Set();
    categories[category].add(subcategory);
    products[category] = products[category] || {};
    products[category][subcategory] = products[category][subcategory] || 0;
    
    if (products[category][subcategory] < 10) {
      const s = subcategory.toLowerCase().replace(/ |\//g, '-');
      const subcategorySlug = transliterate(s);
      
      const title = product['Имя товара'];
      if (products.titles.has(title)) continue;
  
      const _description = product['Описание'];
      const description = _description.slice(0, _description.indexOf('<div rel="v:rating">')).trim();
      if (!description) continue;
  
      const _details = product['Характеристики (HTML/Table)'];
      if (!_details) continue;
      const details = (() => {
        const table = new JSDOM(_details).window.document;
        const rows = table.querySelectorAll('tr');
        if (!rows.length) return null;
        return [].map.call(rows, (row => {
          return [].map.call(row.children, (c => c.textContent.replace('/\\/g', '')));
        }));
      })();
      if (!details) continue;
      
      products[category][subcategory]++;
      
      products.titles.add(title);
      products.items.push({
        title,
        description: _description.slice(0, _description.indexOf('<div rel="v:rating">')).trim(),
        category,
        subcategory: subcategorySlug,
        images: product['Ссылки на фото (через пробел)'].split(' ').map(link => link.trim()).slice(0, 5),
        price: product['Цена'],
        details,
      });
    }
  }
}

Object.keys(categories).forEach(category => {
  categories[category] = Array.from(categories[category]);
});

fs.writeFileSync(path.join(__dirname, 'categories.json'), JSON.stringify(categories));
fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(products.items));

console.log(`all done. ${products.items.length} products; ${Object.keys(categories).length} categories`);
