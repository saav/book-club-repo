const express = require('express');
const app = express();
const messages = require('./messages');
const bodyParser = require('body-parser');

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
app.post('/submit', (req, res) => {
  const book = req.body.book;
  console.log(`Book submitted: ${book}`);
  res.send(`Book submitted: ${book}`);
});

const port = 3000;
app.listen(port, () => {
 console.log(`Server is running at http://localhost:${port}`);
});