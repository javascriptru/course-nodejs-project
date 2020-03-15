const app = require('./app');
const config = require('./config');
const socket = require('./libs/socket');
const logger = require('./libs/logger');

const server = app.listen(config.port, () => {
  logger.info(`App is running on http://localhost:${config.port}`);
});

socket(server);
