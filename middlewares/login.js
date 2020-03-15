const uuid = require('uuid/v4');
const Session = require('../models/Session');

module.exports = async (ctx, next) => {
  ctx.login = async function(user) {
    const token = uuid();
    await Session.create({ token, user, lastVisit: new Date() });
    
    return token;
  };
  
  return next();
};
