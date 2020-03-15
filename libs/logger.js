const { createLogger, format, transports } = require('winston');
const config = require('../config');

const logger = createLogger({
  level: config.logger.level,
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.simple()
  ),
  defaultMeta: { service: 'any-shop' },
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;
