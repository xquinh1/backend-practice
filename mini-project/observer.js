class UserSubject {
    constructor() {
        this.observers = []
    }

    subcribe(observer) {
        this.observers.push[observer]
    }

    notify(data) {
        this.observers.forEach(o => {
            try {
                o.update(data)
            } catch (err) {
                console.error("observer error:", err.message)
            }
        })
    }
}

class EmailService {
    update(user) {
        console.log("send email to", user.email)
    }
}

class LogService {
    update(user) {
        console.log("log user ", user.name)
    }
}

module.exports = { UserSubject, EmailService, LogService }