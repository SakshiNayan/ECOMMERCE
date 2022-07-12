const mongoose= require("mongoose");

const signupSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phone_no :{
        type :Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    }
});

const signupModal = mongoose.model("usersignup",signupSchema);
module.exports = signupModal;