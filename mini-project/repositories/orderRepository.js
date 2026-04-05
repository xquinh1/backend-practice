const pool = require("../databases/db")

class OrderRepository {
    // constructor() {
    //     this.orders = []
    //     this.currentId = 1
    // }
    
    async save(order) {
        const result = await pool.query(
            "INSERT INTO orders (user_id, amount) VALUES ($1, $2, $3) RETURNING *",
            [order.userId, order.amount, order.paymentType]
        )

        return result.rows[0]
    }

    async findByUserId(userId) {
        const result = await pool.query(
            "SELECT * FROM orders WHERE user_id = $1",
            [userId]
        )

        return result.rows
    }

    async findAll() {
        const result = await pool.query(
            "SELECT * FROM orders"
        )
        return result.rows
    }

    // save(order) {
    //     order.id = this.currentId++
    //     this.orders.push(order)
    //     return order
    // }

    // findByUserId(userId) {
    //     return this.orders.filter(o => o.userId === userId)
    // }
}

module.exports = { OrderRepository }