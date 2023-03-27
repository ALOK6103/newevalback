const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
  age: Number,
  city: String,
  is_married: Boolean
},{
    versionKey:false
});

const UserModel=mongoose.model("users",UserSchema)

module.exports={
    UserModel
}
