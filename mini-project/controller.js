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
    
    checkout(data) {
        try {
            return this.service.checkout(data.userId, data.paymentType)
        } catch (err) {
            console.error("Checkout user error", err.message)
        }
    }
}

module.exports = { Controller }

