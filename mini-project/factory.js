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

class PaypalPayment {
    pay() {
        console.log("pay with paypal")
    }
}

class PaymentFactory {
    static payments = {
        momo: () => new MomoPayment(),
        zalo: () => new ZaloPayment(),
        paypal: () => new PaypalPayment()
    }

    static create(type) {
        const payment = this.payments[type]

        if (!payment) {
            throw new Error("Invalid payment")
        }

        return payment()
    }
}

module.exports = { PaymentFactory, MomoPayment, ZaloPayment, PaymentFactory }