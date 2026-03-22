class Subject {
    constructor() {
        this.observers = []
    }

    subscribe(observer) {
        this.observers.push(observer)
    }

    notify(data) {
        this.observers.forEach(o => o.update(data))
    }
}

class EmailService {
    update(data) {
        console.log("send email:", data)
    }
}
   
class LogService {
    update(data) {
        console.log("log:", data)
    }
}

const subject = new Subject()
const email = new EmailService()
const log = new LogService()

subject.subscribe(email)
subject.subscribe(log)

subject.notify("user created")