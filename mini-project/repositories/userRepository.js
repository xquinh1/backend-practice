const pool = require("../databases/db")

class UserRepository {
    async findAll() {
        const result = await pool.query("SELECT * FROM users")
        return result.rows
    }

    async findByEmail(email) {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        )

        return result.rows[0]
    }

    async findById(userId) {
        const result = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [userId]
        )

        return result.rows[0]
    }

    async save(user) {
        const result = await pool.query(
            "INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *",
            [user.name, user.email, user.role]
        )

        return result.rows[0]
    }
    // constructor() {
    //     this.users = []
    //     this.currentId = 1
    // }

    // save(user) {
    //     user.id = this.currentId++
    //     this.users.push(user)
    //     return user
    // }

    // findAll() {
    //     return this.users
    // }

    // findById(id) {
    //     return this.users.find(user => user.id === id)
    // }
}

module.exports = { UserRepository }