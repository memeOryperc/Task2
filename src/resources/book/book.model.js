const {
    v4: uuid
} = require('uuid');

class Book {
    constructor({
        id = uuid(),
        orderId = 'null',
        title = 'Revival',
        author = 'Stepan Kulik',
        section = 'fantasy'
    } = {}) {
        this.id = id;
        this.orderId = orderId;
        this.title = title;
        this.author = author;
        this.section = section;
    }

    static toResponse(book) {
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

module.exports = Book;
