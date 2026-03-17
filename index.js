const { AuthService, EmailService, UserRepository } = require('./userService')
const {MomoPayment, ZaloPayment, checkout } = require('./payment')

const auth = new AuthService()
const email = new EmailService()
const user = new UserRepository()

const momo = new MomoPayment()
const zalo = new ZaloPayment()

// auth.registerUser()

checkout(momo)
checkout(zalo)
