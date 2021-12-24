import { IOrder } from '../order/order.interface';
import visitorsRepo from './visitor.memory.repository';
import ordersRepo from '../order/order.memory.repository';
import booksRepo from '../book/book.memory.repository';

import { IBaseVisitor, IVisitor } from './visitor.interface';

const getAll = async (): Promise<IVisitor[]> => visitorsRepo.getAll();

const getById = async (id: string): Promise<IVisitor | null> => visitorsRepo.getById(id);

const getOrdersByVisitorId = async (id: string): Promise<IOrder[] | null> => ordersRepo.getOrdersByVisitorId(id);

const createVisitor = async (visitor: IBaseVisitor): Promise<IVisitor> => visitorsRepo.createVisitor(visitor);

const updateById = async (visitor: IVisitor): Promise<IVisitor | null> => visitorsRepo.updateById(visitor);

const deleteById = async (id: string): Promise<IVisitor | null> => {
    const visitorDeletable = await getById(id);
    await visitorsRepo.deleteById(id);
    await ordersRepo.deleteByVisitorId(id);
    const order = ordersRepo.getOrdersByDelVisitorId(id)
    order.map((i) => booksRepo.deleteByOrderId(i.id))
    return visitorDeletable;
};

export default {
    getAll,
    getById,
    getOrdersByVisitorId,
    createVisitor,
    updateById,
    deleteById
};