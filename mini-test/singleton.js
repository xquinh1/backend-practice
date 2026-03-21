class Config {
    constructor() {
        if (Config.instance) {
            return Config.instance
        }
        Config.instance = this
    }
}

const cf1 = new Config()
const cf2 = new Config()

console.log(cf1 === cf2)