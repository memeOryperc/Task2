import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';


import Book from '../book/book.model';
import Order from './order.model';

import ordersService from './order.service';
import catchErrors from '../../common/catchErrors';

const router = Router();

router.route('/').get(
    catchErrors(async (_req: Request, res: Response) => {
        const orders = await ordersService.getAll();

        res.json(orders.map(Order.toResponse));
    })
);

router.route('/:id').get(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const order = await ordersService.getById(id || '');

        if (order) {
            res.json(Order.toResponse(order));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'ORDER_NOT_FOUND',
                    msg: 'Order not found'
                });
        }
    })
);

router.route('/:id/books').get(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const orders = await ordersService.getBooksByOrderId(id || '');

        if (orders) {
            res.json(orders.map((ord) => Book.toResponse(ord)));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'BOOKS_NOT_FOUND',
                    msg: 'Books not found'
                });
        }
    })
);

router.route('/').post(
    catchErrors(async (req: Request, res: Response) => {
        const {
            visitorId,
            date,
            timeOfUse
        } = req.body;

        const order = await ordersService.createOrder({
            visitorId: visitorId || '',
            date,
            timeOfUse
        });

        if (order) {
            res.status(StatusCodes.CREATED).json(Order.toResponse(order));
        } else {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    code: 'ORDER_NOT_CREATED',
                    msg: 'Order not created'
                });
        }
    })
);

router.route('/:id').put(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;
        const {
            visitorId,
            date,
            timeOfUse
        } = req.body;

        const order = await ordersService.updateById({
            id: id || '',
            visitorId: visitorId || '',
            date,
            timeOfUse
        });

        if (order) {
            res.status(StatusCodes.OK).json(Order.toResponse(order));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'ORDER_NOT_FOUND',
                    msg: 'Order not found'
                });
        }
    })
);

router.route('/:id').delete(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const order = await ordersService.deleteById(id || '');

        if (!order) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'ORDER_NOT_FOUND',
                    msg: 'Order not found'
                });
        }

        return res
            .status(StatusCodes.NO_CONTENT)
            .json({
                code: 'ORDER_DELETED',
                msg: 'The Order has been deleted'
            });
    })
);

export default router;