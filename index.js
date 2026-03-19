// const { AuthService, EmailService, UserRepository } = require('./userService')
// const { MomoPayment, ZaloPayment, checkout } = require('./payment')
const { userController } = require('./userController')

// const auth = new AuthService()
// const email = new EmailService()
// const user = new UserRepository()
const controller = new userController()

// const momo = new MomoPayment()
// const zalo = new ZaloPayment()

// auth.registerUser()

// checkout(momo)
// checkout(zalo)

controller.createUser({
    name: "quynh",
    email: "xnqnh0320@gmail.com"
})
