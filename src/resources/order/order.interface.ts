export interface IBaseOrder {
    visitorId: string | null;
    date: string;
    timeOfUse: string;
}

export interface IOrder extends IBaseOrder {
    id: string;
}

export interface IBaseOrderResponse extends Partial<IBaseOrder> {
    id: string;
}

export interface IBaseOrderPartial extends Partial<IBaseOrder> { }
