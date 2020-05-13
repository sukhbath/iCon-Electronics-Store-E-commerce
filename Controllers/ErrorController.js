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
    var text = error.errmsg.match(/\{([^}]+)\}/ig)[0].replace(/{/ig, "").replace(/}/ig, "")
    myerror = new CustomError(`Alredy exist ${text}`, 400)
    return myerror
}



module.exports = (error, request, response, next) => {
    console.log("error middlwwawre")
    var myerror;
    if (error.name == 'ValidationError') {
        myerror = validationError(error)
    } else if (error.code == 11000) {
        myerror = DuplicateError(error)
    } else {
        myerror = error
    }
    console.log(error)
    response.status(myerror.status || 500).send(myerror)

    // response.render("404", {
    //     error: myerror.message
    // })

}