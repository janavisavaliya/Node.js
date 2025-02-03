const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
})
const movies = mongoose.model("movie", movieSchema);
module.exports = movies