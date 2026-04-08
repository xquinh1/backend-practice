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

    createOrder(data) {
        try {
            return this.service.createOrder(data)
        } catch (err) {
            console.error("Create user errow:", err.message)
        }
    }
    
    getUsers() {
        return this.service.getAll()
    }
    
    getOrders() {
        return this.service.getAllOrders()
    }
    

    async getUserById(userId) {
        return await this.service.getUserById(userId)
    }

    getOrdersByUserId(userId) {
        return this.service.getOrders(userId)
       }
    
    checkout(userId, paymentType) {
        try {
            return this.service.checkout(userId, paymentType)
        } catch (err) {
            console.error("Checkout user error", err.message)
        }
    }

    async login(req, res) {
        try {
            const token = await this.service.login(req.body.email)
            res.json({ token })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }
}

module.exports = { Controller }

