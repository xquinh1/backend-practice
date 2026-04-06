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

    async checkout(userId, paymentType) {
        const user = await this.userRepository.findById(userId)
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