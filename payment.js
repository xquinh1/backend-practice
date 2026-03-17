class MomoPayment {
    pay() {
        console.log("pay with momo")
    }
}

class ZaloPayment {
    pay() {
        console.log("pay with zalo")
    }
}

function checkout(payment) {
    payment.pay()
}

module.exports = { MomoPayment, ZaloPayment, checkout}