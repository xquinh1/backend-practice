class MomoPayment {
    pay() {
     console.log("momo")
    }
}
   
class ZaloPayment {
    pay() {
     console.log("zalo")
    }
}


class PaymentFactory {
    static payments = {
        momo: () => new MomoPayment(),
        zalo: () => new ZaloPayment()
    }

    static create(type) {
        const payment = this.payments[type]

        if (!payment) {
            throw new Error("Invalid payment")
        }

        return payment()
    }
}

const payment = PaymentFactory.create("momo")
payment.pay()