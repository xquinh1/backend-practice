class Controller {
    constructor(service) {
        this.service = service
    }

    createUser(data) {
        try {
            return this.service.createUser(data)
        } catch (err) {
            console.error("Create user error:", err.message)
        }
    }
    
    getUser() {
        return this.service.getAll()
    }

    getOrdersByUser(userId) {
        return this.service.getOrders(userId)
       }
    
    checkout(userId, paymentType) {
        try {
            return this.service.checkout(userId, paymentType)
        } catch (err) {
            console.error("Checkout user error", err.message)
        }
    }

    login(req, res) {
        try {
            const token = this.service.login(req.body.email)
            res.json({ token })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }
}

module.exports = { Controller }

