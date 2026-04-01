const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Dependencies
const { Controller } = require("./controllers/controller");
const { PaymentFactory } = require("./factories/factory");
const { UserSubject } = require("./observers/observer");
const { UserRepository } = require("./repositories/userRepository");
const { OrderRepository } = require("./repositories/orderRepository");
const { Service } = require("./services/service");
const createRoutes = require("./routes/route");

// Instantiate repositories and other dependencies
function initializeDependencies() {
  const userRepo = new UserRepository();
  const orderRepo = new OrderRepository();
  const factory = PaymentFactory;
  const subject = new UserSubject();

  const service = new Service(userRepo, orderRepo, factory, subject);
  const controller = new Controller(service);

  return controller;
}

const controller = initializeDependencies();

// Sample usage/demo logic - consider moving to seed_script.js or removing in production
// function demo(controller) {
//   const user = controller.createUser({
//     name: "Quinh",
//     email: "xnqnh0320@gmail.com",
//   });

//   controller.checkout({
//     userId: 1,
//     paymentType: "paypal",
//   });

//   // console.log(controller.getOrdersByUser(user));

//   console.log("User name:", user.name, "| User email:", user.email);
// }

// demo(controller);

// Routes
app.use("/", createRoutes(controller));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    
  console.log(`Server running on port ${PORT}`);
});
