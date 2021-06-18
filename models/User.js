const mongoose = require('mongoose');
const { Mongoose } = require('mongoose');


const UserScheme = mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true,
    }, 
    gender: {
        type: String,
    },
    birthdate: {
        type: Date,
        required: true
    },
});


module.exports = mongoose.model("users", UserScheme);
