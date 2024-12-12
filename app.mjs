import pool from './db/pool.mjs';
import signUpRouter from './routes/signUpRouter.mjs';

import express from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import 'dotenv/config';

import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';

const PORT = process.env.PORT;

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

const pgSession = new connectPgSimple(session);
app.use(
  session({
    store: new pgSession({
      pool,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  }),
);

const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      try {
        const { rows } = await pool.query(
          'SELECT * FROM app_user WHERE email = $1',
          [username],
        );
        const user = rows[0];

        // If user does not exist
        if (!user) {
          return done(null, false, { message: 'That user does not exist' });
        }

        // If user exists but password is wrong
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, {
            message: 'Email and password do not match',
          });
        }

        // If user exists and password matches, congrats! Log in time!
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM app_user WHERE id = $1', [
      id,
    ]);
    const user = rows[0];
    done(null, {
      id: user.id,
      first_name: user.first_name,
    });
  } catch (error) {
    done(error);
  }
});

app.use(passport.session());

// Debug.
app.use((req, res, next) => {
  console.log('sesh:', req.session);
  console.log('user:', req.user);
  console.log('msgs:', req.session.messages);
  next();
});

app.use('/sign-up', signUpRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', user: req.user });
});

app.get('/log-in', (req, res) => {
  res.render('log-in', { title: 'Login', user: req.user });
});

app.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
    failureMessage: true,
  }),
);

app.post('/log-out', (req, res, next) => {
  req.logOut((error) => {
    if (error) next(error);
    res.redirect('/');
  });
});

app.use((req, res, next) => {
  res.send('404 - page not found');
});

app.use((error, req, res, next) => {
  res.send('500 - error');
});

app.listen(PORT, () => console.log('Server listening on port', PORT));
