import passport from 'passport';
import { dbEmailStrategy } from './db/dbStrategy.mjs';

function init(pool) {
  passport.use('local', dbEmailStrategy(pool));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM app_user WHERE id = $1',
        [id],
      );
      const user = rows[0];
      done(null, {
        id: user.id,
        first_name: user.first_name,
      });
    } catch (error) {
      done(error);
    }
  });

  return passport;
}

export default init;
