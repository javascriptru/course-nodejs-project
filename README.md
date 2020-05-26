# Any shop

Source code for Node.js course project on [learn.javascript.ru](https://learn.javascript.ru/courses/nodejs).
See [live demo](https://course-nodejs.javascript.ru/).

## Installation

For local development you need Node.js and MongoDB installed on your PC.
Clone this repo and then:
```bash
npm install # install server dependencies
cd client/ && npm install && cd .. # install client dependencies
node fixtures/index.js # fill database
npm start # start server
```

If you want to work on client side code:
```bash
cd client/
npm start
```

## Deployment

Command `node index.js` will start server that will serve content from `public` folder. In order to update public folder command `npm run build` should be executed.
Production configuration stores inside `production.env` file (which is not part of this repo).
