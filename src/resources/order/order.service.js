const ordersRepo = require('./order.memory.repository');
const booksRepo = require('../book/book.memory.repository');

const getAll = () => ordersRepo.getAll();

const getById = (id) => ordersRepo.getById(id);

const getBooksByOrderId = (id) => booksRepo.getBooksByOrderId(id);

const createOrder = ({
    id,
    visitorId,
    date,
    timeOfUse
}) => ordersRepo.createOrder({
    id,
    visitorId,
    date,
    timeOfUse
});

const updateById = async (id) => ({
    visitorId,
    date,
    timeOfUse
}) => ordersRepo.updateById({
    id,
    visitorId,
    date,
    timeOfUse
});

const deleteById = async (id) => {
    const orderDeletable = await getById(id);
    ordersRepo.deleteById(id);
    booksRepo.deleteByOrderId(id);
    return orderDeletable;
}


module.exports = {
    getAll,
    getById,
    getBooksByOrderId,
    createOrder,
    updateById,
    deleteById
}