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
          return done(null, false, { message: 'That user does not exist' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, {
            message: 'The email and password do not match',
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  );
}

export { dbEmailStrategy };
