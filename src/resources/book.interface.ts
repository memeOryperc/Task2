export interface IBaseBook {
    orderId: string | null;
    title: string;
    author: string;
    section: string;
}

export interface IBook extends IBaseBook {
    id: string;
}

export interface IBaseBookPartial extends Partial<IBaseBook> {
}
