// HTML5 history in browser
const fs = require('fs');
const path = require('path');

const index = fs.readFileSync(path.join(__dirname, '../public/index.html'));

module.exports = async ctx => {
  if (ctx.url.startsWith('/api') || ctx.method !== 'GET') return;

  ctx.set('content-type', 'text/html');
  ctx.body = index;
};
