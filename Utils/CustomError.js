class CustomError extends Error {
    constructor(message, status) {
        this.message = message
        this.status = status
        this.isLogical = true
    }
}

module.exports = CustomError