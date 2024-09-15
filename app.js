const express = require('express');
const app = express();
const messages = require('./messages');
const bodyParser = require('body-parser');
const books = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
 res.send(messages.home);
});
app.get('/about', (req, res) => {
 res.send(messages.about);
});
app.use((req, res) => {
 res.status(404).send(messages.notFound);
});

app.post('/submit', (req, res, next) => {
  const book = req.body.book;
  if (!book) {
    const err = new Error('Book title is required');
    return next(err);
  }
  books.push(book);
  console.log(`Book submitted: ${book}`);
  res.send(`Book submitted: ${book}`);
});

app.get('/books', (req, res) => {
  res.send(books.join(', '));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something Went Wrong!');
});

const port = 3000;
app.listen(port, () => {
 console.log(`Server is running at http://localhost:${port}`);
});