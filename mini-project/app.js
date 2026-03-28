const express = require("express")
const app = express()

app.use(express.json())

const { Controller } = require("./controllers/controller");
const { PaymentFactory } = require("./factories/factory");
const { UserSubject } = require("./observers/observer");
const { UserRepository } = require("./repositories/userRepository");
const { OrderRepository } = require("./repositories/orderRepository")
const { Service } = require("./services/service");

const createRoutes = require("./routes/route")

const userRepo = new UserRepository()
const orderRepo = new OrderRepository()
const factory = PaymentFactory
const subject = new UserSubject()

const service = new Service(userRepo, orderRepo, factory, subject)
const controller = new Controller(service)

const user = controller.createUser({
    name: "Quinh",
    email: "xnqnh0320@gmail.com"
})

controller.checkout({
    userId: 1,
    paymentType: "paypal",
})

// controller.getOrdersByUser(user)

console.log("name user:", user.name + " email user:", user.email)

app.use("/", createRoutes(controller))

app.listen(3000, () => {
 console.log("Server running on port 3000")
})

