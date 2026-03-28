const express = require("express")
const { authMiddleware } = require("../authMiddleware")
const router = express.Router()

module.exports = ( controller ) => {

    router.post("/users", (req, res) => {
        try {
            const user = controller.createUser(req.body)
            res.status(201).json(user)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })

    router.get("/users", (req, res) => {
        res.json(controller.getUsers())
    })

    router.get("/users/:id/orders", (req, res) => {
        try {
            const orders = controller.getOrdersByUser(Number(req.params.id))
            res.json(orders)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })

    router.post("/users/checkout", authMiddleware, (req, res) => {
        try {
            const result = controller.checkout(req.body)
            res.json({ message: result })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })

    router.post("/login", (req, res) => {
        controller.login(req, res)
    })

    return router
}

