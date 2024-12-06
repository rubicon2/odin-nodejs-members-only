import signUpRouter from './routes/signUpRouter.mjs';
import express from 'express';
import session from 'express-session';
import 'dotenv/config';

const PORT = process.env.PORT;

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  }),
);

app.use('/sign-up', signUpRouter);

app.get('/', (req, res, next) => {
  res.send('Index page!');
});

app.use((req, res, next) => {
  res.send('404 - page not found');
});

app.use((error, req, res, next) => {
  res.send('500 - error');
});

app.listen(PORT, () => console.log('Server listening on port', PORT));
