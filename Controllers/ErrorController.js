var CustomError = require('../Utils/CustomError')

var validationError = function (error) {
    var message = '';
    for (const key in error.errors) {
        message += error.errors[key].message
    }
    myerror = new CustomError(message, 400)
    return myerror
}


var DuplicateError = function (error) {
    var text = "";
    var message;

    for (const key in error.keyValue) {
        text += key + ' '
    }

    if (text.includes('user product')) {
        message = 'Product is already in cart'
    } else if (text.includes('product user')) {
        message = 'You have already added review'
    } else {
        message = `${text} Alredy exist`
    }

    myerror = new CustomError(message, 400)
    return myerror
}


var LoginError = function (error) {
    myerror = new CustomError(`Please Login to get access`, 400)
    return myerror
}

var PasswdLengthError = function (error) {
    myerror = new CustomError(`Password length must be atleas 5`, 400)
    return myerror
}

module.exports = (error, request, response, next) => {
    var myerror;
    if (error.name == 'ValidationError') {
        myerror = validationError(error)
    } else if (error.code == 11000) {
        myerror = DuplicateError(error)
    } else if (error.name == 'JsonWebTokenError') {
        myerror = LoginError(error)
    } else {
        myerror = error
    }


    console.log(error)

    if (request.originalUrl.startsWith("/api")) {
        response.status(myerror.status || 500).send(myerror)
    } else {
        response.render("error", {
            error: myerror.message
        })
    }
}