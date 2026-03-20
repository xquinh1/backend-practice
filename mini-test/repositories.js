class UserRepository {
    constructor() {
        this.users = []
    }

    save(user) {
        this.users.push(user)
        return user
    }

    findAll() {
        return this.users
    }
}

module.exports = { UserRepository }