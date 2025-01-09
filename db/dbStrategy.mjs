import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';

function dbEmailStrategy(pool) {
  return new passportLocal.Strategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const { rows } = await pool.query(
          'SELECT * FROM app_user WHERE email = $1',
          [email],
        );
        const user = rows[0];

        if (!user) {
          // Passport message can only be a string, not an object, so encode message
          // object as JSON so we can pass info like which form field was incorrect.
          const msgJSON = JSON.stringify({
            path: 'email',
            msg: 'That user does not exist',
          });
          return done(null, false, { message: msgJSON });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // Passport message can only be a string, not an object, so encode message
          // object as JSON so we can pass info like which form field was incorrect.
          const msgJSON = JSON.stringify({
            path: 'password',
            msg: 'The email and password do not match',
          });
          return done(null, false, { message: msgJSON });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  );
}

export { dbEmailStrategy };
