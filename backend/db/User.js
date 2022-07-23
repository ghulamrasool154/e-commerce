const mongoose = require('mongoose');
// schema
const userSchema = new mongoose.Schema ({
    name : String,
    email : String,
    password : String,
});

// model 
module.exports = mongoose.model('users', userSchema)
