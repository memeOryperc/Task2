const {
    v4: uuid
} = require('uuid');

class Order {
    constructor({
        id = uuid(),
        visitorId = '1f4604c3-132a-49e1-b346-78b77be6f6bb',
        date = '11.11.2001',
        timeOfUse = '14 days'
    } = {}) {
        this.id = id;
        this.visitorId = visitorId;
        this.date = date;
        this.timeOfUse = timeOfUse;
    }

    static toResponse(order) {
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

module.exports = Order;
