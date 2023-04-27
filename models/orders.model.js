const Order = require('./schemas').Order;

const db = require('./db');

exports.getOrders = (status) => {
    let options = {};
    status && (options.status = status);
    return db.connect(() => Order.find(options));
}

exports.getOrderById = (orderId) => {
    return db.connect(() => Order.findById(orderId));
}

exports.getOrdersByUserId = (userId, status) => {
    let options = { userId: userId };
    status && (options.status = status);
    return db.connect(() => Order.find(options));
}

exports.createOrder = ({ product, userId, quantity }, address) => {
    let order = new Order({
        userId: userId,
        product: product,
        quantity: quantity,
        address: address,
        timeUpdated: Date.now()
    })

    return db.connect(() => order.save());
}

exports.createManyOrders = (items, address) => {
    let orders = items.map(item => new Order({
        userId: item.userId,
        product: item.product,
        quantity: item.quantity,
        address: address,
        timeUpdated: Date.now()
    }))

    return db.connect(() => Order.insertMany(orders));
}

exports.updateOrder = (orderId, status) => {
    return db.connect(() => Order.updateOne({ _id: orderId }, {
        $set: {
            status: status,
            timeUpdated: Date.now()
        }
    }))
}

exports.deleteOrder = (orderId) => {
    return db.connect(() => Order.findByIdAndDelete(orderId));
}