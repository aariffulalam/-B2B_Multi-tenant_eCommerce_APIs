const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();

const config = require('./config/config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻', config });
});

app.use('/user', require('./routes/user.route'));
app.use('/product', require('./routes/product.route'))
app.use('/order', require('./routes/order.route'))

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = config.port || 5000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${ PORT}`));
