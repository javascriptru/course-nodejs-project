const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
    {usernameField: 'email', session: false},
    async function(email, password, done) {
      try {
        const user = await User.findOne({email});
        if (!user) {
          return done(null, false, 'Нет такого пользователя');
        }
        
        if (!user.passwordHash) {
          return done(null, false, 'Для пользователя не задан пароль, войдите с помощью социальной сети');
        }

        const isValidPassword = await user.checkPassword(password);

        if (!isValidPassword) {
          return done(null, false, 'Невереный пароль');
        }

        if (user.verificationToken) {
          return done(null, false, 'Подтвердите email');
        }

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
);
