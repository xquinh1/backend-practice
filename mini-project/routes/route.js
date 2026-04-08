const express = require("express")
const { authMiddleware } = require("../authMiddleware")
const router = express.Router()

module.exports = ( controller ) => {

    router.post("/register", async (req, res) => {
        try {
            const { name, email, role } = req.body

            const user = await controller.createUser({ name, email, role })
            res.status(201).json(user)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })

    router.get("/users", authMiddleware , async (req, res) => {
        try {
            const { role, userId } = req.user

            if (role === "admin") {
                const users = await controller.getUsers()
                return res.status(200).json(users)
            } 

            const user = await controller.getUserById(Number(userId))
            if (!user) {
                return res.status(404).json({ error: "User not found" })
            } 
            return res.status(200).json([user])
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })

    router.post("/create-order", authMiddleware, async (req, res) => {
        try {
            const { amount, payment_type } = req.body
            const userId = req.user.userId

            const order = await controller.createOrder({ user_id: userId, amount, payment_type })
            res.json(order)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })

    router.get("/users/:id/orders", authMiddleware, async (req, res) => {
        try {
            const { role, userId } = req.user      
            const selectedUserId = Number(req.params.id)     
            
            if (selectedUserId !== userId && role !== "admin" ) {
                return res.status(403).json({ error: "Forbidden" })
            }

            if (role === "admin") {
                const orders = await controller.getOrdersByUserId(Number(req.params.id))
                return res.status(200).json(orders)
            } 

            const orders = await controller.getOrdersByUserId(userId)
            return res.json(orders)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    })

    router.post("/users/checkout", authMiddleware, async (req, res) => {
        try {
            const result = await controller.checkout(req.user.userId, req.body.payment_type)
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

