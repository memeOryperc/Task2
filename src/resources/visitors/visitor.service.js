const visitorsRepo = require('./visitor.memory.repository');
const ordersRepo = require('../order/order.memory.repository');
const booksRepo = require('../book/book.memory.repository')

const getAll = () => visitorsRepo.getAll();

const getById = (id) => visitorsRepo.getById(id);

const getOrdersByVisitorId = (id) => ordersRepo.getOrdersByVisitorId(id);

const createVisitor = ({
    id,
    lastName,
    firstName,
    phoneNumber,
    libraryCard
}) => visitorsRepo.createVisitor({
    id,
    lastName,
    firstName,
    phoneNumber,
    libraryCard
});

const updateById = async (id) => ({
    lastName,
    firstName,
    phoneNumber,
    libraryCard
}) => visitorsRepo.updateById({
    id,
    lastName,
    firstName,
    phoneNumber,
    libraryCard
});

const deleteById = async (id) => {
    const visitorDeletable = await getById(id);
    visitorsRepo.deleteById(id);
    ordersRepo.deleteByVisitorId(id);
    booksRepo.deleteByOrderId(ordersRepo.getOrdersByVisitorId(id));
    return visitorDeletable;
};

module.exports = {
    getAll,
    getById,
    getOrdersByVisitorId,
    createVisitor,
    updateById,
    deleteById
};
