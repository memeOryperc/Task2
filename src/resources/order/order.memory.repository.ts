import { IBaseOrder, IOrder } from './order.interface';
import Order from './order.model';
import booksRepo from '../book/book.memory.repository';


const ORDERS: IOrder[] = [];

const getAll = async (): Promise<IOrder[]> => ORDERS;

const getById = async (id: string): Promise<IOrder | null> => ORDERS.find((order) => order.id === id) || null;

const getOrdersByVisitorId = async (visitorId: string): Promise<IOrder[] | null> => {
    const orders = ORDERS.filter((order) => order.visitorId === visitorId);
    return orders;
}

const getOrdersByDelVisitorId = (visitorId: string): IOrder[] => {
    const orders = ORDERS.filter((order) => order.visitorId === visitorId);
    return orders;
}

const createOrder = async ({
    visitorId,
    date,
    timeOfUse
}: IBaseOrder): Promise<IOrder> => {
    const order = new Order({
        visitorId,
        date,
        timeOfUse
    })
    ORDERS.push(order);
    return order;
}

const updateById = async ({
    id,
    visitorId,
    date,
    timeOfUse
}: IOrder): Promise<IOrder | null> => {
    const orderPos = ORDERS.findIndex((order) => order.id === id);

    if (orderPos === -1) return null;

    const oldOrder = ORDERS[orderPos];

    const newOrder = {
        ...oldOrder,
        visitorId,
        date,
        timeOfUse,
        id
    };

    ORDERS.splice(orderPos, 1, newOrder);
    return newOrder;
}

const deleteById = async (id: string): Promise<IOrder | null> => {
    const orderPos = ORDERS.findIndex((order) => order.id === id);

    if (orderPos === -1) return null;

    const orderDeletable = ORDERS[orderPos]!;

    ORDERS.splice(orderPos, 1);
    return orderDeletable;
}

const deleteByVisitorId = async (visitorId: string): Promise<void> => {
    const orders = ORDERS.filter((order) => order.visitorId === visitorId);

    await Promise.allSettled(orders.map(async (order) => {
        deleteById(order.id);
        booksRepo.deleteByOrderId(order.id);
    }))
}

export default {
    ORDERS,
    getAll,
    getById,
    getOrdersByVisitorId,
    getOrdersByDelVisitorId,
    createOrder,
    updateById,
    deleteById,
    deleteByVisitorId
}