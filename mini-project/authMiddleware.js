const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: "No token" })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, "secret_key")

        req.user = decoded

        if ( !req.user.role || req.user.role !== "admin") {
            return res.status(403).json({ error: "Forbidden" })
        }

        next() 
    } catch (err) {
        console.log("jwt error", err.message)
        res.status(401).json({ error: "Invalid token" })
    }
}

module.exports = { authMiddleware }