const { Controller } = require("./controller");
const { PaymentFactory } = require("./factory");
const { UserSubject } = require("./observer");
const { Repository } = require("./repository");
const { Service } = require("./service");

const repo = new Repository()
const factory = PaymentFactory
const subject = new UserSubject()

const service = new Service(repo, factory, subject)
const controller = new Controller(service)

const user = controller.createUser({
    name: "Quinh",
    email: "xnqnh0320@gmail.com"
})

controller.checkout({
    userId: 1,
    paymentType: "paypal"
})

console.log("name user:", user.name + " email user", user.email)

