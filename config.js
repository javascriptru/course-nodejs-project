const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, 'production.env'),
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

const DOMAIN = process.env.DOMAIN || `http://${HOST}${PORT !== 80 ? ':' + PORT : ''}`;

module.exports = {
  port: PORT,
  host: HOST,
  domain: DOMAIN,
  mongodb: {
    uri: (process.env.NODE_ENV === 'test')
      ? 'mongodb://localhost/any-shop-test'
      : process.env.MONGODB_URI || 'mongodb://localhost/any-shop',
  },
  crypto: {
    iterations: (process.env.NODE_ENV !== 'production' ? 1 : 12000),
    length: 128,
    digest: 'sha512',
  },
  logger: {
    level: (process.env.NODE_ENV !== 'production' ? 'verbose' : 'info'),
  },
  providers: {
    github: {
      app_id: process.env.GITHUB_APP_ID || 'github_app_id',
      app_secret: process.env.GITHUB_APP_SECRET || 'github_app_secret',
      callback_uri: `${DOMAIN}/oauth/github`,
      options: {
        scope: ['user:email'],
      },
    },
    yandex: {
      app_id: process.env.YANDEX_APP_ID || 'yandex_app_id',
      app_secret: process.env.YANDEX_APP_SECRET || 'yandex_app_secret',
      callback_uri: `${DOMAIN}/oauth/yandex`,
      options: {
      },
    },
    vkontakte: {
      app_id: process.env.VKONTAKTE_APP_ID || 'vkontakte_app_id',
      app_secret: process.env.VKONTAKTE_APP_SECRET || 'vkontakte_app_secret',
      callback_uri: `${DOMAIN}/oauth/vkontakte`,
      options: {
        scope: ['email'],
      },
    },
  },
  mailer: {
    user: process.env.GMAIL_USER || '',
    password: process.env.GMAIL_PASSWORD || '',
  },
};
