import { IBook, IBaseBook } from './book.interface';
import Book from './book.model';

const BOOKS: IBook[] = []

const getAll = async (): Promise<IBook[]> => BOOKS;

const getById = async (id: string): Promise<IBook | null> => BOOKS.find((book) => book.id === id) || null;

const getBooksByOrderId = async (orderId: string): Promise<IBook[] | null> => {
    const books = BOOKS.filter((book) => book.orderId === orderId);
    return books;
}

const createBook = async ({
    orderId,
    title,
    author,
    section
}: IBaseBook): Promise<IBook> => {
    const book = new Book({
        orderId,
        title,
        author,
        section
    })
    BOOKS.push(book);
    return book;
}

const updateById = async ({
    id,
    orderId,
    title,
    author,
    section
}: IBook): Promise<IBook | null> => {
    const bookPos = BOOKS.findIndex((book) => book.id === id);

    if (bookPos === -1) return null;

    const oldBook = BOOKS[bookPos];

    const newBook = {
        ...oldBook,
        orderId,
        title,
        author,
        section,
        id
    };

    BOOKS.splice(bookPos, 1, newBook);
    return newBook;

};

const deleteById = async (id: string): Promise<IBook | null> => {
    const bookPos = BOOKS.findIndex((book) => book.id === id);

    if (bookPos === -1) return null;

    const bookDeletable = BOOKS[bookPos]!;

    BOOKS.splice(bookPos, 1);
    return bookDeletable;
}

const deleteByOrderId = async (orderId: string): Promise<void> => {
    const orders = BOOKS.filter((book) => book.orderId === orderId);

    await Promise.allSettled(orders.map(async (book) => deleteById(book.id)));
}

export default {
    BOOKS,
    getAll,
    getById,
    getBooksByOrderId,
    createBook,
    updateById,
    deleteById,
    deleteByOrderId
}