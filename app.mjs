import express from 'express';
import 'dotenv/config';

const PORT = process.env.PORT;

const app = express();

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
