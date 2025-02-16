const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add Contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add Contact email"]
    },
    phno: {
        type: String,
        required: [true, "Please add Contact phno"]
    }
}, { timestams: true })

module.exports = mongoose.model("Contact",contactSchema)