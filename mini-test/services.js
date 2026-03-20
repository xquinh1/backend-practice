// const { userRepository } = require("./repositories")

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    create(user) {
        if(!user.name) {
            throw new Error("Name require!!")
        }   
        return this.userRepository.save(user)
    }

    getAll() {
        return this.userRepository.findAll()
    }
}

module.exports = { UserService }