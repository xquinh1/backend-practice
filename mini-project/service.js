class Service {
    constructor(repository, paymentFactory, userSubject) {
        this.repository = repository
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
        const newUser = this.repository.save(user)

        this.userSubject.notify(newUser)

        return newUser
    }

    getAll() {
        return this.repository.findAll()
    }

    checkout(userId, paymentType) {
        const user = this.repository.findById(userId)
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
        
        return payment.pay()
    }
}

module.exports = { Service }