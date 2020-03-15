const Session = require('../models/Session');

module.exports = async function session(ctx, next) {
  const header = ctx.request.get('Authorization');
  if (!header) return next();
  
  const token = header.split(' ')[1];
  if (!token) return next();
  
  const session = await Session.findOne({ token }).populate('user');
  if (!session) {
    ctx.throw(401, 'Неверный аутентификационный токен');
  }
  session.lastVisit = new Date();
  await session.save();
  
  ctx.user = session.user;
  return next();
};
