const express = require('express');
const visitorRouter = require("./resources/visitor/visitor.router");
const orderRouter = require("./resources/order/order.router");
const bookRouter = require("./resources/book/book.router");

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/visitors', visitorRouter);
app.use('/orders', orderRouter);
app.use('/books', bookRouter);

module.exports = app;
