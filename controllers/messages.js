const Message = require('../models/Message');

module.exports = async function messages(ctx, next) {
  ctx.body = {messages: []};
};
