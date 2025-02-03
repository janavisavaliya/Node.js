const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true
    },
    userpassword: {
        type: String,
        required: true
    }
});

const u = mongoose.model("User", UserSchema);
module.exports = u;