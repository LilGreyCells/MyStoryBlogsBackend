class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
    handleError = (res) => {
  
        res.status(this.statusCode).json({
          status: "error",
          this.statusCode,
          this.message
        });
      } 
  }

  module.exports = {
    ErrorHandler
  }
