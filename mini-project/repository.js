class Repository {
    constructor() {
        this.users = []
        this.currentId = 1
    }

    save(user) {
        user.id = this.currentId++
        this.users.push(user)
        return user
    }

    findAll() {
        return this.users
    }

    findById(id) {
        return this.users.find(user => user.id === id)
    }
}

module.exports = { Repository }