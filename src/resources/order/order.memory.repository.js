const Order = require('./order.model')
const booksRepo = require('../book/book.memory.repository');

const Orders = [new Order()];

const getAll = async () => Orders;

const getById = async (id) => Orders.find((order) => order.id === id);

const getOrdersByVisitorId = async (visitorId) => {
    const orders = Orders.filter((order) => order.visitorId === visitorId);
    return orders;
}

const createOrder = async ({
    visitorId,
    date,
    timeOfUse
}) => {
    const order = new Order({
        visitorId,
        date,
        timeOfUse
    })
    Orders.push(order);
    return order;
}

const updateById = async (id) => ({
    visitorId,
    date,
    timeOfUse
}) => {
    const orderPos = Orders.findIndex((order) => order.id === id);

    if (orderPos === -1) return null;

    const oldOrder = Orders[orderPos];

    const newOrder = {
        ...oldOrder,
        visitorId,
        date,
        timeOfUse
    };

    Orders.splice(orderPos, 1, newOrder);
    return newOrder;
}

const deleteById = async (id) => {
    const orderPos = Orders.findIndex((order) => order.id === id);

    if (orderPos === -1) return null;

    const orderDeletable = Orders[orderPos];

    Orders.splice(orderPos, 1);
    return orderDeletable;
}

const deleteByVisitorId = async (visitorId) => {
    const orders = Orders.filter((order) => order.visitorId === visitorId);

    await Promise.allSettled(orders.map(async (order) => {
        deleteById(order.id);
        booksRepo.deleteByOrderId(order.id);
    }))
}

module.exports = {
    Orders,
    getAll,
    getById,
    getOrdersByVisitorId,
    createOrder,
    updateById,
    deleteById,
    deleteByVisitorId
}