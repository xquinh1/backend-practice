const { AuthService, EmailService, UserRepository } = require('./userService')
const auth = new AuthService()
const email = new EmailService()
const user = new UserRepository()


auth.registerUser()