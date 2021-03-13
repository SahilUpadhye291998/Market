const mongoose = require("mongoose");

let User = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    isAuthenticated: {
        type: Boolean,
        required: true,
        default: false,
    },
    typeOf: {
        type: String,
        required: true,
    },
});

module.exports = User = mongoose.model("User", User);
