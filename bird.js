class Bird {
    move() {
        console.log("bird is moving")
    }
}

class Penguin extends Bird {
    swim() {
        console.log("penguin is swimming")
    }
}

const penguin = new Penguin()

penguin.move()
penguin.swim()