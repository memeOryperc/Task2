import {
    v4 as uuid
} from 'uuid';

import { IOrder, IBaseOrderPartial, IBaseOrderResponse } from './order.interface';

class Order {
    id: string;

    visitorId: string | null;

    date: string;

    timeOfUse: string;

    constructor({
        visitorId = 'null',
        date = '11.11.2001',
        timeOfUse = '14 days'
    }: IBaseOrderPartial = {}) {
        this.id = uuid();
        this.visitorId = visitorId;
        this.date = date;
        this.timeOfUse = timeOfUse;
    }

    static toResponse(order: IOrder): IBaseOrderResponse {
        const {
            id,
            visitorId,
            date,
            timeOfUse
        } = order;
        return {
            id,
            visitorId,
            date,
            timeOfUse
        };
    }
}

export default Order;