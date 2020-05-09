class CustomError extends Error {
    constructor(message, status) {
        super()
        this.message = message
        this.status = status || 500
        this.isLogical = true
    }
}

module.exports = CustomError