class UserController {
    constructor(userService) {
        this.userService = userService
    }

    createUser(req) {
        return this.userService.create(req)
    }

    getUsers() {
        return this.userService.getAll()
    }
}

module.exports = { UserController }