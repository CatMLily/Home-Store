const messageCode = require('./MessageCode');
 
class response {
  constructor(){

  }
  static success(code) {
    return {
      code: code,
      message: messageCode[code],
      result: null
    }
  }

  static success(code, result) {
    return {
      code: code,
      message: messageCode[code],
      result: result
    }
  }

  static failure(code) {
    return {
      code: code,
      message: messageCode[code],
      result: null
    }
  }

  static failure(code, message) {
    return {
      code: code,
      message: messageCode[code],
      result: message
    }
  }
}

module.exports = response;