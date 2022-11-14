const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    studentID:{type:String, required:[true,'Student-ID is required!'], unique:true},
    password:{type:String, required:[true,'Password is required!'], select:false},
    name:{type:String, required:[true,'Name is required!']},
});

module.exports = mongoose.model("user", UserSchema);