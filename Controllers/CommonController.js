var CatchError = require('./../Utils/CatchError')
var CustomError = require('./../Utils/CustomError')

exports.createDocument = Model => CatchError(async function (request, response, next) {
    var document = await Model.create(request.body)
    response.status(201).send({
        status: "success",
        message: "Document Created",
        document
    })
})

exports.getAllDocument = Model => CatchError(async function (request, response, next) {
    var documents = await Model.find()
    response.status(200).send({
        status: "success",
        length: documents.length,
        data: {
            documents
        }
    })
})

exports.getOneDocument = Model => CatchError(async function (request, response, next) {
    var document = await Model.findById(request.params.id)
    if (!document) return next(new CustomError('No document found', 404))
    response.status(200).send({
        status: "success",
        data: {
            document
        }
    })
})


exports.updateDocument = Model => CatchError(async function (request, response, next) {
    var updatedDocument = await Model.findByIdAndUpdate(request.params.id, request.body, {
        new: true
    })
    if (!updatedDocument) return next(new CustomError('No Document found to updated❌', 404))
    response.status(200).send({
        status: "success",
        data: {
            updatedDocument
        }
    })
})

exports.deleteDocument = Model => CatchError(async function (request, response, next) {
    var deletedDocument = await Model.findByIdAndDelete(request.params.id)
    if (!deletedDocument) return next(new CustomError('No Document found to deleted❌', 404))
    response.status(204).send({
        status: "success",
        data: {
            deletedDocument
        }
    })
})