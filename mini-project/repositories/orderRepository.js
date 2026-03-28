class OrderRepository {
    constructor() {
        this.orders = []
        this.currentId = 1
    }

    save(order) {
        order.id = this.currentId++
        this.orders.push(order)
        return order
    }

    findByUserId(userId) {
        return this.orders.filter(o => o.userId === userId)
    }
}

module.exports = { OrderRepository }