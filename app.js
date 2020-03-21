const path = require('path');
const Koa = require('koa');
const config = require('./config');

const app = new Koa();

app.use(require('@koa/cors')());
app.use(require('koa-bodyparser')());
app.use(require('koa-static')(path.join(__dirname, 'public')));

app.use(require('./middlewares/logger'));
app.use(require('./middlewares/session'));
app.use(require('./middlewares/error'));
app.use(require('./middlewares/login'));

app.use(require('./router').allowedMethods());
app.use(require('./router').routes());

app.use(require('./middlewares/history'));

module.exports = app;
