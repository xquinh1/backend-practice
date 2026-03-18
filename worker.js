class Human {
    work() {
        console.log("working")
    }

    eat() {
        console.log("eating")
    }
}

class Robot {
    work() {
        console.log("working")
    }
}

function startWork(worker) {
    worker.work()
   }

function startEating(eatable) {
    eatable.eat()
}

   
const human = new Human()
const robot = new Robot()

startWork(human)
startWork(robot)
startEating(human)
