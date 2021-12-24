const {
  StatusCodes
} = require('http-status-codes');

const router = require('express').Router();
const Visitor = require('./visitor.model');
const Order = require('../order/order.model');

const visitorsService = require('./visitor.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const visitors = await visitorsService.getAll();

    res.json(visitors.map(Visitor.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const {
      id
    } = req.params;

    const visitor = await visitorsService.getById(id);

    if (visitor) {
      res.json(Visitor.toResponse(visitor));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({
          code: 'VISITOR_NOT_FOUND',
          msg: 'Visitor not found'
        });
    }
  })
);

router.route('/:id/orders').get(
  catchErrors(async (req, res) => {
    const {
      id
    } = req.params;

    const orders = await visitorsService.getOrdersByVisitorId(id);

    if (orders) {
      res.json(orders.map((ord) => Order.toResponse(ord)));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({
          code: 'ODRED_NOT_FOUND',
          msg: 'Order not found'
        });
    }
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const {
      lastName,
      fristName,
      phoneNumber,
      libraryCard
    } = req.body;

    const visitor = await visitorsService.createVisitor({
      lastName,
      fristName,
      phoneNumber,
      libraryCard
    });

    if (visitor) {
      res.status(StatusCodes.CREATED).json(Visitor.toResponse(visitor));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          code: 'VISITOR_NOT_CREATED',
          msg: 'Visitor not created'
        });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const {
      id
    } = req.params;
    const {
      lastName,
      fristName,
      phoneNumber,
      libraryCard
    } = req.body;

    const visitor = await visitorsService.updateById({
      id,
      lastName,
      fristName,
      phoneNumber,
      libraryCard
    });

    if (visitor) {
      res.status(StatusCodes.OK).json(Visitor.toResponse(visitor));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({
          code: 'VISITOR_NOT_FOUND',
          msg: 'Visitor not found'
        });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const {
      id
    } = req.params;

    const visitor = await visitorsService.deleteById(id);

    if (!visitor) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({
          code: 'VISITOR_NOT_FOUND',
          msg: 'VISITOR not found'
        });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({
        code: 'VISITOR_DELETED',
        msg: 'The visitor has been deleted'
      });
  })
);

module.exports = router;