const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = Schema({
  studentID: {
    type: String,
    required: [true, "Student-ID is required!"],
    unique: true,
  },
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", UserSchema);
