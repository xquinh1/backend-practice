const { userService } = require("./userServiceClearArchietecture")

class userController {
    constructor() {
        this.userService = new userService()
    }

    createUser(req) {
        return this.userService.create(req)
    }
}

module.exports = { userController }