import pool from './db/pool.mjs';
import init from './passport.mjs';

import signUpRouter from './routes/signUpRouter.mjs';
import logInRouter from './routes/logInRouter.mjs';
import secretCodeRouter from './routes/secretCodeRouter.mjs';
import adminRouter from './routes/adminRouter.mjs';
import messageRouter from './routes/messageRouter.mjs';

import express from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import 'dotenv/config';

const PORT = process.env.PORT;

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
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

const passport = init(pool);
app.use(passport.session());

// Debug.
app.use((req, res, next) => {
  console.log('sesh:', req.session);
  console.log('user:', req.user);
  console.log('msgs:', req.session.messages);
  next();
});

app.use('/secret-code', secretCodeRouter);
app.use('/log-in', logInRouter);
app.use('/sign-up', signUpRouter);
app.use('/admin', adminRouter);
app.use('/message', messageRouter);

app.get('/', (req, res) => {
  res.status(301).redirect('/message');
  // res.render('index', { title: 'Home', user: req.user });
});

app.post('/log-out', (req, res, next) => {
  req.logOut((error) => {
    if (error) next(error);
    res.redirect('/');
  });
});

app.use((req, res, next) => {
  res.render('404', { title: 'Page not found', user: req.user });
});

app.use((error, req, res, next) => {
  // res.send('500 - error');
  res.render('error', { title: 'Error', user: req.user, error });
});

app.listen(PORT, () => console.log('Server listening on port', PORT));
