let mongoose = require('mongoose');

let schema = new mongoose.Schema({
    Name: String,
    Surname: String,
    Age: String,
    Gender: String,
    timestamp: Number
})

module.exports = mongoose.model('tuple',schema)