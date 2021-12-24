const booksRepo = require('./book.memory.repository');

const getAll = () => booksRepo.getAll();

const getById = (id) => booksRepo.getById(id);

const createBook = ({
    id,
    orderId,
    title,
    author,
    section
}) => booksRepo.createBook({
    id,
    orderId,
    title,
    author,
    section
});

const updateById = async (id) => ({
    orderId,
    title,
    author,
    section
}) => booksRepo.updateById({
    id,
    orderId,
    title,
    author,
    section
});

const deleteById = async (id) => {
    const bookDeletable = await getById(id);
    booksRepo.deleteById(id);
    return bookDeletable;
}

module.exports = {
    getAll,
    getById,
    createBook,
    updateById,
    deleteById
}