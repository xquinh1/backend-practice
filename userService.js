

class AuthService {
    registerUser() {
        console.log("register user")

        const email = new EmailService()
        const repo = new UserRepository()

        email.sendEmail()
        repo.saveToDatabase()
       }
      
    loginUser() {
        console.log("login user")
       }
}

class EmailService {
    sendEmail() {
        console.log("send email")
       }
}

class UserRepository {
    saveToDatabase() {
        console.log("save user")
       }
}

module.exports = { AuthService, EmailService, UserRepository }
   