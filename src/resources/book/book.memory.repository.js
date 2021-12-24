const Book = require('./book.model')

const Books = [new Book()]

const getAll = async () => Books;

const getById = async (id) => Books.find((book) => book.id === id);

const getBooksByOrderId = async (orderId) => {
    const books = Books.filter((book) => book.orderId === orderId);
    return books;
}

const createBook = async ({
    orderId,
    title,
    author,
    section
}) => {
    const book = new Book({
        orderId,
        title,
        author,
        section
    })
    Books.push(book)
    return book
}

const updateById = async (id) => ({
    orderId,
    title,
    author,
    section
}) => {
    const bookPos = Books.findIndex((book) => book.id === id);

    if (bookPos === -1) return null;

    const oldBook = Books[bookPos];

    const newBook = {
        ...oldBook,
        orderId,
        title,
        author,
        section
    };

    Books.splice(bookPos, 1, newBook);
    return newBook;

};

const deleteById = async (id) => {
    const bookPos = Books.findIndex((book) => book.id === id);

    if (bookPos === -1) return null;

    const bookDeletable = Books[bookPos];

    Books.splice(bookPos, 1);
    return bookDeletable;
}

const deleteByOrderId = async (orderId) => {
    const orders = Books.filter((book) => book.orderId === orderId);

    await Promise.allSettled(orders.map(async (book) => deleteById(book.id)));
}

module.exports = {
    Books,
    getAll,
    getById,
    getBooksByOrderId,
    createBook,
    updateById,
    deleteById,
    deleteByOrderId
}