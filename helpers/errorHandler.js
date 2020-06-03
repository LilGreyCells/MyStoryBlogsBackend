class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
  handleError(res) {
    res.status(this.statusCode).json({
      status: 'error',
      statusCode: this.statusCode,
      message: this.message,
    })
  }
}

module.exports = {
  ErrorHandler,
}
