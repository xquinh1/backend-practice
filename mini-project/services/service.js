class Service {
    constructor(userRepository, orderRepository, paymentFactory, userSubject) {
        this.userRepository = userRepository
        this.orderRepository = orderRepository
        this.paymentFactory = paymentFactory
        this.userSubject = userSubject
    }

    async createUser(user) {
        if (!user.name) {
            throw new Error("Name require!!")
        }
        if (!user.email || !user.email.includes("@") ) {
            throw new Error("Email require!!")
        }

        if (!user.role) {
            user.role = "user"
        }
        
        const newUser = this.userRepository.save(user)

        this.userSubject.notify(newUser)

        return await newUser
    }

    async createOrder(order) {
        if (!order.amount) {
            throw new Error("Amount require!!")
        }
        if (!order.payment_type) {
            throw new Error("Payment require!!")
        }

        const newOrder = await this.orderRepository.save(order)

        return newOrder
    }

    async getAll() {
        return await this.userRepository.findAll()
    }

    async getUserById(userId) {
        return await this.userRepository.findById(userId)
    }


    async getOrders(userId) {
        const user = await this.userRepository.findById(userId)

        if (!user) {
            throw new Error("User not found")
        }

        return this.orderRepository.findByUserId(userId)
    }

    async getAllOrders() {
        return await this.orderRepository.findAll()
    }

    async checkout(userId, payment_type) {
        const user = await this.userRepository.findById(userId)
        if (!user) {
            throw new Error("User not found")
        }
        if (!payment_type) {
            throw new Error("Payment type required!!")
        }

        const payment = this.paymentFactory.create(payment_type)

        if (!payment || !payment.pay) {
            throw new Error("Invalid payment")
        }
        
        // const order = this.orderRepository.save({
        //     userId,
        //     amount: 100
        // })     

        // return order
    }

    async login(email) {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new Error("User not found")
        }
        
        const jwt = require("jsonwebtoken")

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            "secret_key",
            { expiresIn: "1h" }
        )

        return token
    }
}

module.exports = { Service }