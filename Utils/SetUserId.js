var CatchError = require('./../Utils/CatchError')
module.exports = CatchError(async function (request, response, next) {
    request.params.id = request.user.id
    next()
})