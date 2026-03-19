const { userRepository } = require("./userRepository")

class userService {
    constructor() {
        this.userRepository = new userRepository()
    }

    create(user) {
        this.userRepository.save(user)
    }
}

module.exports = { userService }