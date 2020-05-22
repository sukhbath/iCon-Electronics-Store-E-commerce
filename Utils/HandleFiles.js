var multer = require('multer')
var CustomError = require('../Utils/CustomError')

var storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, `${__dirname}/../Public/images/users`)
    },
    filename: function (request, file, cb) {
        var ext = file.mimetype.split('/')[1]
        cb(null, `user-${request.body.name}-${Date.now()}.${ext}`)
    }
})


var fileFilter = function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new CustomError('Only image files are accepted', 400))
    }
}


var upload = multer({
    storage,
    fileFilter
})

module.exports = upload.single('photo')