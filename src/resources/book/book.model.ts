import {
    v4 as uuid
} from 'uuid';

import { IBaseBookPartial, IBook } from './book.interface';

class Book {
    id: string;

    orderId: string | null;

    title: string;

    author: string;

    section: string;

    constructor({
        orderId = 'null',
        title = 'Revival',
        author = 'Stepan Kulik',
        section = 'fantasy'
    }: IBaseBookPartial = {}) {
        this.id = uuid();
        this.orderId = orderId;
        this.title = title;
        this.author = author;
        this.section = section;
    }

    static toResponse(book: IBook): IBook {
        const {
            id,
            orderId,
            title,
            author,
            section
        } = book;
        return {
            id,
            orderId,
            title,
            author,
            section
        };
    }
}

export default Book;