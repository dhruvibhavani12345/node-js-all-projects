const mongoose = require('mongoose')

const addSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    protype: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
})

const adduser = mongoose.model('adduser', addSchema);
module.exports = adduser;