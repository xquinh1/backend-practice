class Service {
    constructor(userRepository, orderRepository, paymentFactory, userSubject) {
        this.userRepository = userRepository
        this.orderRepository = orderRepository
        this.paymentFactory = paymentFactory
        this.userSubject = userSubject
    }

    createUser(user) {
        if (!user.name) {
            throw new Error("Name require!!")
        }
        if (!user.email || !user.email.includes("@") ) {
            throw new Error("Email require!!")
        }
        const newUser = this.userRepository.save(user)

        this.userSubject.notify(newUser)

        return newUser
    }

    getAll() {
        return this.userRepository.findAll()
    }

    getOrders(userId) {
        const user = this.userRepository.findById(userId)

        if (!user) {
            throw new Error("User not found")
        }

        return this.orderRepository.findByUserId(userId)
    }

    checkout(userId, paymentType) {
        const user = this.userRepository.findById(userId)
        if (!user) {
            throw new Error("User not found")
        }
        if (!paymentType) {
            throw new Error("Payment type required!!")
        }

        const payment = this.paymentFactory.create(paymentType)

        if (!payment || !payment.pay) {
            throw new Error("Invalid payment")
        }
        
        payment.pay()

        const order = this.orderRepository.save({
            userId,
            amount: 100
        })     

        return order
    }

    login(email) {
        const user = this.userRepository.findAll().find(u => u.email === email)

        if (!user) {
            throw new Error("User not found")
        }
        
        const jwt = require("jsonwebtoken")

        const token = jwt.sign(
            { userId: user.id },
            "secret_key",
            { expiresIn: "1h" }
        )

        return token
    }
}

module.exports = { Service }