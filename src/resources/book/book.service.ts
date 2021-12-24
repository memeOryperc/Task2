import booksRepo from './book.memory.repository';

import { IBaseBook, IBook } from './book.interface';

const getAll = async (): Promise<IBook[]> => booksRepo.getAll();

const getById = async (id: string): Promise<IBook | null> => booksRepo.getById(id);

const createBook = async (book: IBaseBook): Promise<IBook | null> => booksRepo.createBook(book);

const updateById = async (book: IBook): Promise<IBook | null> => booksRepo.updateById(book);

const deleteById = async (id: string): Promise<IBook | null> => {
    const bookDeletable = await getById(id);
    booksRepo.deleteById(id);
    return bookDeletable;
}
export default {
    getAll,
    getById,
    createBook,
    updateById,
    deleteById
}