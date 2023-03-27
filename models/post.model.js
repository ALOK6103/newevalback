const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    no_of_comments: Number,
    userID:String
},{
    versionKey:false
});

const PostModel=mongoose.model("posts",PostSchema)

module.exports={
    PostModel
}