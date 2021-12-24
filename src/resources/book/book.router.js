const {
    StatusCodes
} = require('http-status-codes');
const router = require('express').Router();
const Book = require('./book.model');

const booksService = require('./book.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
    catchErrors(async (req, res) => {
        const books = await booksService.getAll();

        res.json(books.map(Book.toResponse));
    })
);

router.route('/:id').get(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const book = await booksService.getById(id);

        if (book) {
            res.json(Book.toResponse(book));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'BOOK_NOT_FOUND',
                    msg: 'Book not found'
                });
        }
    })
);

router.route('/').post(
    catchErrors(async (req, res) => {
        const {
            orderId,
            title,
            author,
            section
        } = req.body;
        const book = await booksService.createBook({
            orderId,
            title,
            author,
            section
        });

        if (book) {
            res.status(StatusCodes.CREATED).json(Book.toResponse(book));
        } else {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    code: 'BOOK_NOT_CREATED',
                    msg: 'Book not created'
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
            orderId,
            title,
            author,
            section
        } = req.body;

        const book = await booksService.updateById({
            id,
            orderId,
            title,
            author,
            section
        });

        if (book) {
            res.status(StatusCodes.OK).json(Book.toResponse(book));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'BOOK_NOT_FOUND',
                    msg: 'Book not found'
                });
        }
    })
);

router.route('/:id').delete(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const book = await booksService.deleteById(id);

        if (!book) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'BOOK_NOT_FOUND',
                    msg: 'BOOK not found'
                });
        }

        return res
            .status(StatusCodes.NO_CONTENT)
            .json({
                code: 'BOOK_DELETED',
                msg: 'The Book has been deleted'
            });
    })
);

module.exports = router;