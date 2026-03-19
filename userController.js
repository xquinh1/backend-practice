const { userService } = require("./userServiceClearArchietecture")

class userController {
    constructor() {
        this.userService = new userService()
    }

    createUser(req) {
        this.userService.create(req)
    }
}

module.exports = { userController }