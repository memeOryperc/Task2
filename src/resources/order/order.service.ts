import { IBook } from '../book/book.interface';
import ordersRepo from './order.memory.repository';
import booksRepo from '../book/book.memory.repository';

import { IBaseOrder, IOrder } from './order.interface';


const getAll = async (): Promise<IOrder[]> => ordersRepo.getAll();

const getById = async (id: string): Promise<IOrder | null> => ordersRepo.getById(id);

const getBooksByOrderId = async (id: string): Promise<IBook[] | null> => booksRepo.getBooksByOrderId(id);

const createOrder = async (order: IBaseOrder): Promise<IOrder> => ordersRepo.createOrder(order);

const updateById = async (order: IOrder): Promise<IOrder | null> => ordersRepo.updateById(order);

const deleteById = async (id: string): Promise<IOrder | null> => {
    const orderDeletable = await getById(id);
    ordersRepo.deleteById(id);
    booksRepo.deleteByOrderId(id);
    return orderDeletable;
}


export default {
    getAll,
    getById,
    getBooksByOrderId,
    createOrder,
    updateById,
    deleteById
}