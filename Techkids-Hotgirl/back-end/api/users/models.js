// user models
// email 
//password
//fbId
//firstName, lastName
//createAt

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email :String,
    password : String,
    fbId : String,
    firstName : String,
    lastName : String,
    avatarUrl : String,
    createAt : {
        type : Date,
        default : Date.now
    }
});
const UserModal = mongoose.model('User',UserSchema);
module.exports = UserModal;