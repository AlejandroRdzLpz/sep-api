const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('../routers/index.js');

const app = express();
const PORT = process.env.PORT || 5000;

// closure
const bodyParser = express.json({ extended: true });

app.use(morgan('dev'));
app.use(bodyParser);
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1> SEP API </h1>');
});

app.use('/api/v1', router);

module.exports = {
  app,
  PORT,
};