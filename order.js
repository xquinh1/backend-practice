class Payment {
    pay() {
        throw Error("must implement pay()")
    }
}

class MomoPayment extends Payment {
    pay() {
     console.log("pay with momo")
    }
   }
   
class ZaloPayment extends Payment {
    pay() {
     console.log("pay with zalo")
    }
   }
   
class OrderService {
    constructor(payment) {
        this.payment = payment
    }

    checkout() {
        this.payment.pay()
       }
   }

const momo = new MomoPayment()
const zalo = new ZaloPayment()
const orderByMomo = new OrderService(momo)
const orderByZalo = new OrderService(zalo)

orderByMomo.checkout()
orderByZalo.checkout()

