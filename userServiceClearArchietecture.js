const { userRepository } = require("./userRepository")

class userService {
    constructor() {
        this.userRepository = new userRepository()
    }

    create(user) {
        return this.userRepository.save(user)
    }
}

module.exports = { userService }