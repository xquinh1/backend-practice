const express = require("express")
const { authMiddleware } = require("../authMiddleware")
const router = express.Router()

module.exports = ( controller ) => {

    router.post("/users", async (req, res) => {
        try {
            const user = await controller.createUser(req.body)
            res.status(201).json(user)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })

    router.get("/users", async (req, res) => {
        await res.json(controller.getUsers())
    })

    router.get("/users/:id/orders", async (req, res) => {
        try {
            const orders = await controller.getOrdersByUser(Number(req.params.id))
            res.json(orders)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })

    router.post("/users/checkout", authMiddleware, async (req, res) => {
        try {
            const result = await controller.checkout(req.user.userId, req.body.paymentType)
            res.json({ message: result })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })

    router.post("/login", async (req, res) => {
        await controller.login(req, res)
    })

    return router
}

