const logger = require('../libs/logger');

module.exports = async function(ctx, next) {
  const ts = Date.now();
  
  await next();
  
  logger.info(`${ctx.method} ${ctx.url} ${ctx.status} ${Date.now() - ts}ms ${ctx.response.length} bytes`);
};
