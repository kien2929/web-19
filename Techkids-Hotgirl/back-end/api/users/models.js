// user models
// email 
//password
//fbId
//firstName, lastName
//createAt

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    fbId : String,
    firstName : String,
    lastName : String,
    avatarUrl : String,
    createAt : {
        type : Date,
        default : Date.now
    }
});
const UserModal = mongoose.model('usermodels',UserSchema);
module.exports = UserModal;