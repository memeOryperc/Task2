import express from 'express';

import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import consumerRouter from "./resources/visitor/visitor.router";
import orderRouter from "./resources/order/order.router";
import productRouter from "./resources/book/book.router";

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/consumers', consumerRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);

export default app;
