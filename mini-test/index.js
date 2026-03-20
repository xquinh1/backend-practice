const { UserRepository } = require('./repositories')
const { UserService } = require('./services')
const { UserController } = require('./controllers')

const userRepository = new UserRepository
const userService = new UserService(userRepository)
const userController = new UserController(userService)

userController.createUser({
    name: 'quynh'
})

const users = userController.getUsers()

console.log(users)