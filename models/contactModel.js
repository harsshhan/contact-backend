const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: "User"
    },
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