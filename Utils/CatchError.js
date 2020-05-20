module.exports = function (func) {

    return function (request, response, next) {
        func(request, response, next).catch(next);
    }

    // return function (request, response, next) {
    //     try {
    //         func(request, response, next)
    //         // next()
    //     } catch (error) {
    //         console.log("i am catch erro")
    //         next(error)
    //     }

    // }

}